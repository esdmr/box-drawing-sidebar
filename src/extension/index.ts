import * as vscode from 'vscode';
import {BoxDrawingViewProvider} from './webview-providers/box-drawing';
import {ResourceResolver} from './resource';

export function activate(context: vscode.ExtensionContext) {
	console.log('[box-drawing-sidebar]', 'Activated');

	const resources = new ResourceResolver(context.extensionUri);
	const boxDrawing = new BoxDrawingViewProvider(resources);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(
		`box-drawing-sidebar.${boxDrawing.id}`,
		boxDrawing,
	), boxDrawing);
}

export function deactivate() {
	console.log('[box-drawing-sidebar]', 'Deactivated');
}
