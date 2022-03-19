import * as vscode from 'vscode';
import {MessageHandler} from './message';
import {assert, disposeAll} from './utils';

class ResourceResolver {
	constructor(private readonly extensionUri: vscode.Uri) {}

	getResourceUri(...pathSegments: readonly string[]) {
		return vscode.Uri.joinPath(this.extensionUri, 'resources', ...pathSegments);
	}
}

class BoxDrawingViewProvider extends vscode.Disposable implements vscode.WebviewViewProvider {
	private lastActiveTextEditor = vscode.window.activeTextEditor;
	private lastWebview: vscode.Webview | undefined = undefined;
	private readonly messageHandler = new MessageHandler();
	private readonly disposables: vscode.Disposable[] = [this.messageHandler];

	constructor(private readonly resources: ResourceResolver) {
		super(() => {
			disposeAll(this.disposables);
		});

		vscode.window.onDidChangeActiveTextEditor(async editor => {
			console.log('[box-drawing]', 'Active text editor was changed');
			this.lastActiveTextEditor = editor;
			await this.activeTextEditorChanged();
		}, this.disposables);

		this.messageHandler.getEvent('loaded')(async () => {
			console.log('[box-drawing]', 'Webview is loaded');
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
				console.error('[box-drawing]', 'Failed to insert a snippet:', error);
			}
		});
	}

	async resolveWebviewView(webviewView: vscode.WebviewView) {
		const {webview} = webviewView;
		this.lastWebview = webview;

		webview.options = {
			localResourceRoots: [this.resources.getResourceUri()],
			enableScripts: true,
		};

		console.log('[box-drawing]', 'Webview was resolved');

		webviewView.onDidChangeVisibility(() => {
			console.log('[box-drawing]', 'Webview changed visibility');
		});

		webviewView.onDidDispose(() => {
			console.log('[box-drawing]', 'Webview was disposed');
			this.lastWebview = undefined;
		});

		webview.onDidReceiveMessage(result => {
			this.messageHandler.fire(result);
		});

		const timeout = setTimeout(() => {
			webview.html = 'Failed to load webview html file.';
			console.error('[box-drawing]', 'Failed to load webview html file:', 'Timed out');
		}, 250);

		const textDecoder = new TextDecoder();

		try {
			const array = await vscode.workspace.fs.readFile(this.resources.getResourceUri('box-drawing.html'));

			webview.html = textDecoder.decode(array)
				.replace(/\${\s*\.\s*cspSource\s*}/g, webview.cspSource)
				// eslint-disable-next-line no-template-curly-in-string
				.replace(/\b(href|src)="\.\//g, '$1="${.resources}/')
				.replace(/\${\s*\.\s*resources\s*}/g, webview.asWebviewUri(this.resources.getResourceUri()).toString());
		} catch (error: unknown) {
			webview.html = 'Failed to load webview html file.';
			console.error('[box-drawing]', 'Failed to load webview html file:', error);
		} finally {
			clearTimeout(timeout);
		}
	}

	private async activeTextEditorChanged() {
		await this.lastWebview?.postMessage({
			type: 'onDidChangeActiveTextEditor',
			isTextEditorActive: this.lastActiveTextEditor !== undefined,
		});
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('[box-drawing]', 'Activated');

	const resources = new ResourceResolver(context.extensionUri);
	const boxDrawing = new BoxDrawingViewProvider(resources);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(
		'box-drawing-sidebar.box-drawing',
		boxDrawing,
	), boxDrawing);
}

export function deactivate() {
	console.log('[box-drawing]', 'Deactivated');
}
