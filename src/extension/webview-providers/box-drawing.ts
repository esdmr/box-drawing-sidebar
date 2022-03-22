import * as vscode from 'vscode';
import type {ResourceResolver} from '../resource.js';
import {assert} from '../utils.js';
import {WebviewViewProvider} from './base.js';

export class BoxDrawingViewProvider extends WebviewViewProvider {
	private lastActiveTextEditor = vscode.window.activeTextEditor;
	private lastWebview: vscode.Webview | undefined = undefined;

	constructor(resources: ResourceResolver) {
		super('box-drawing', resources);

		vscode.window.onDidChangeActiveTextEditor(async editor => {
			console.log('[box-drawing-sidebar]', '[box-drawing]', 'Active text editor was changed');
			this.lastActiveTextEditor = editor;
			await this.activeTextEditorChanged();
		}, this.disposables);

		this.messageHandler.getEvent('loaded')(async () => {
			console.log('[box-drawing-sidebar]', '[box-drawing]', 'Webview is loaded');
			await this.activeTextEditorChanged();
		});

		this.messageHandler.getEvent('insertSnippet')(async message => {
			try {
				const editor = this.lastActiveTextEditor;
				const {snippet} = message;

				assert(editor !== undefined, 'There is no editor to insert the snippet into');
				assert(typeof snippet === 'string', 'Snippet to insert must be a string');

				await editor.insertSnippet(new vscode.SnippetString(snippet));
			} catch (error: unknown) {
				console.error('[box-drawing-sidebar]', '[box-drawing]', 'Failed to insert a snippet:', error);
			}
		});
	}

	async resolveWebviewView(webviewView: vscode.WebviewView) {
		const {webview} = webviewView;
		this.lastWebview = webview;

		console.log('[box-drawing-sidebar]', '[box-drawing]', 'Webview was resolved');

		webviewView.onDidChangeVisibility(() => {
			console.log('[box-drawing-sidebar]', '[box-drawing]', 'Webview changed visibility');
		});

		webviewView.onDidDispose(() => {
			console.log('[box-drawing-sidebar]', '[box-drawing]', 'Webview was disposed');
			this.lastWebview = undefined;
		});

		await super.resolveWebviewView(webviewView);
	}

	private async activeTextEditorChanged() {
		await this.lastWebview?.postMessage({
			type: 'onDidChangeActiveTextEditor',
			isTextEditorActive: this.lastActiveTextEditor !== undefined,
		});
	}
}
