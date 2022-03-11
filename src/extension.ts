import * as vscode from 'vscode';

type SnippetViewResult = RenderResult | {
	type: 'insertSnippet';
	snippet: string;
};

interface RenderResult {
	type: 'png';
	uri: string;
	data: string | undefined;
}

class ResourceResolver {
	constructor (private readonly extensionUri: vscode.Uri) { }

	getResourceUri (...pathSegments: readonly string[]) {
		return vscode.Uri.joinPath(this.extensionUri, 'resources', ...pathSegments);
	}
}

class BoxDrawingViewProvider implements vscode.WebviewViewProvider {
	private view: vscode.WebviewView | undefined;
	private lastActiveTextEditor = vscode.window.activeTextEditor;
	private readonly cbSet = new Set<(e: SnippetViewResult) => void>();

	constructor (
		private readonly resources: ResourceResolver,
		disposables?: vscode.Disposable[],
	) {
		vscode.window.onDidChangeActiveTextEditor((editor) => {
			if (editor) {
				this.lastActiveTextEditor = editor;
			}
		}, disposables);
	}

	get webviewView () {
		return this.view;
	}

	resolveWebviewView (webviewView: vscode.WebviewView) {
		this.view = webviewView;

		webviewView.webview.options = {
			localResourceRoots: [this.resources.getResourceUri()],
			enableScripts: true
		};

		console.log('[box-drawing] webview was resolved');
		webviewView.onDidDispose(() => {
			console.log('[box-drawing] webview was disposed');
			this.view = undefined;
		});

		const timeout = setTimeout(() => {
			webviewView.webview.html = 'Failed to load webview html file (timed out).';
		}, 100);

		const textDecoder = new TextDecoder();

		vscode.workspace.fs.readFile(this.resources.getResourceUri('box-drawing.html'))
			.then((array) => {
				webviewView.webview.html = textDecoder.decode(array)
					.replace(/\$\{\s*\.\s*cspSource\s*\}/g, webviewView.webview.cspSource)
					.replace(/\b(href|src)="\.\//g, '$1="${.resources}/')
					.replace(/\$\{\s*\.\s*resources\s*\}/g, webviewView.webview.asWebviewUri(this.resources.getResourceUri()).toString());

				clearTimeout(timeout);
			});

		webviewView.webview.onDidReceiveMessage((e: SnippetViewResult) => {
			this.cbSet.forEach((cb) => { cb(e); });
			this.messageReceive(e);
		});
	}

	private messageReceive (message: SnippetViewResult) {
		if (message.type === 'insertSnippet') {
			const editor = this.lastActiveTextEditor;
			if (editor) {
				editor.insertSnippet(new vscode.SnippetString(message.snippet.replace(/\\\n/g, '\\n'))).then(
					() => { },
					err => {
						vscode.window.showWarningMessage(`Unable to insert symbol, ${err}`);
					}
				);
			} else {
				vscode.window.showWarningMessage('Unable get document to insert symbol into');
			}
		}
	}

	onDidReceiveMessage (cb: (e: SnippetViewResult) => void) {
		this.cbSet.add(cb);

		return new vscode.Disposable(() => this.cbSet.delete(cb));
	}
}

export function activate (context: vscode.ExtensionContext) {
	console.log('[box-drawing] is activated');

	const resources = new ResourceResolver(context.extensionUri);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(
		'box-drawing-sidebar.box-drawing',
		new BoxDrawingViewProvider(resources, context.subscriptions),
	));
}

export function deactivate () {
	console.log('[box-drawing] is deactivated');
}
