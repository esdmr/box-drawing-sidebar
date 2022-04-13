import vscode from 'vscode';
import {MessageHandler} from '../message.js';
import type {ResourceResolver} from '../resource.js';
import {disposeAll} from '../utils.js';
import parentLogger, {type Logger} from '../../logger.js';

const textDecoder = new TextDecoder();

interface WebviewTypes {
	outbound: unknown;
	inbound: unknown;
}

export abstract class WebviewViewProvider<T extends WebviewTypes> extends vscode.Disposable implements vscode.WebviewViewProvider {
	protected readonly messageHandler = new MessageHandler<T['outbound']>();
	protected readonly disposables: vscode.Disposable[] = [this.messageHandler];
	protected readonly logger: Logger;
	protected lastWebview: vscode.Webview | undefined = undefined;

	constructor(
		readonly id: string,
		protected readonly resources: ResourceResolver,
	) {
		super(() => {
			disposeAll(this.disposables);
		});

		this.logger = parentLogger.nest(id);
	}

	async resolveWebviewView(webviewView: vscode.WebviewView) {
		const {webview} = webviewView;
		this.lastWebview = webview;

		webview.options = {
			localResourceRoots: [this.resources.getResourceUri(this.id)],
			enableScripts: true,
		};

		webview.onDidReceiveMessage(result => {
			this.messageHandler.fire(result);
		});

		this.logger.log('Webview was resolved');

		webviewView.onDidChangeVisibility(() => {
			this.logger.log('Webview changed visibility');
		});

		webviewView.onDidDispose(() => {
			this.logger.log('Webview was disposed');
			this.lastWebview = undefined;
		});

		const timeout = setTimeout(() => {
			webview.html = 'Failed to load webview html file.';
			this.logger.error('Failed to load webview html file:', 'Timed out');
		}, 250);

		try {
			const array = await vscode.workspace.fs.readFile(this.resources.getResourceUri(this.id, 'index.html'));

			webview.html = textDecoder.decode(array)
				.replace(/\${\s*\.\s*cspSource\s*}/g, webview.cspSource)
				// eslint-disable-next-line no-template-curly-in-string
				.replace(/\b(href|src)="\.\//g, '$1="${.resources}/')
				.replace(/\${\s*\.\s*resources\s*}/g, webview.asWebviewUri(this.resources.getResourceUri(this.id)).toString());
		} catch (error: unknown) {
			webview.html = 'Failed to load webview html file.';
			this.logger.error('Failed to load webview html file:', error);
		} finally {
			clearTimeout(timeout);
		}
	}

	protected postMessage<K extends Extract<keyof T['inbound'], string>>(message: T['inbound'][K] & {type: K}) {
		return this.lastWebview?.postMessage(message);
	}
}
