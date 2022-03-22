import vscode from 'vscode';
import {MessageHandler} from '../message.js';
import type {ResourceResolver} from '../resource.js';
import {disposeAll} from '../utils.js';

const textDecoder = new TextDecoder();

export abstract class WebviewViewProvider extends vscode.Disposable implements vscode.WebviewViewProvider {
	protected readonly messageHandler = new MessageHandler();
	protected readonly disposables: vscode.Disposable[] = [this.messageHandler];

	constructor(
		readonly id: string,
		protected readonly resources: ResourceResolver,
	) {
		super(() => {
			disposeAll(this.disposables);
		});
	}

	async resolveWebviewView(webviewView: vscode.WebviewView) {
		const {webview} = webviewView;

		webview.options = {
			localResourceRoots: [this.resources.getResourceUri()],
			enableScripts: true,
		};

		webview.onDidReceiveMessage(result => {
			this.messageHandler.fire(result);
		});

		const timeout = setTimeout(() => {
			webview.html = 'Failed to load webview html file.';
			console.error('[box-drawing-sidebar]', `[${this.id}]`, 'Failed to load webview html file:', 'Timed out');
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
			console.error('[box-drawing-sidebar]', `[${this.id}]`, 'Failed to load webview html file:', error);
		} finally {
			clearTimeout(timeout);
		}
	}
}
