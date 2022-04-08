import vscode from 'vscode';
import {MessageHandler} from '../message.js';
import type {ResourceResolver} from '../resource.js';
import {disposeAll} from '../utils.js';
import parentLogger, {type Logger} from '../../logger.js';

const textDecoder = new TextDecoder();

export abstract class WebviewViewProvider extends vscode.Disposable implements vscode.WebviewViewProvider {
	protected readonly messageHandler = new MessageHandler();
	protected readonly disposables: vscode.Disposable[] = [this.messageHandler];
	protected readonly logger: Logger;

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

		webview.options = {
			localResourceRoots: [this.resources.getResourceUri(this.id)],
			enableScripts: true,
		};

		webview.onDidReceiveMessage(result => {
			this.messageHandler.fire(result);
		});

		const timeout = setTimeout(() => {
			webview.html = 'Failed to load webview html file.';
			this.logger.error('Failed to load webview html file:', 'Timed out');
		}, 250);

		try {
			const array = await vscode.workspace.fs.readFile(this.resources.getResourceUri(this.id, 'index.html'));

			webview.html = textDecoder.decode(array)
				.replace(/\${\s*\.\s*cspSource\s*}/gu, webview.cspSource)
				// eslint-disable-next-line no-template-curly-in-string
				.replace(/\b(href|src)="\.\//gu, '$1="${.resources}/')
				.replace(/\${\s*\.\s*resources\s*}/gu, webview.asWebviewUri(this.resources.getResourceUri(this.id)).toString());
		} catch (error: unknown) {
			webview.html = 'Failed to load webview html file.';
			this.logger.error('Failed to load webview html file:', error);
		} finally {
			clearTimeout(timeout);
		}
	}
}
