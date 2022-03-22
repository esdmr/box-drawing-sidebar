import vscode from 'vscode';
import logger from '../logger.js';
import {BoxDrawingViewProvider} from './webview-providers/box-drawing.js';
import {ResourceResolver} from './resource.js';

export function activate(context: vscode.ExtensionContext) {
	logger.log('Activated');

	const resources = new ResourceResolver(context.extensionUri);
	const boxDrawing = new BoxDrawingViewProvider(resources);

	context.subscriptions.push(vscode.window.registerWebviewViewProvider(
		`box-drawing-sidebar.${boxDrawing.id}`,
		boxDrawing,
	), boxDrawing);
}

export function deactivate() {
	logger.log('Deactivated');
}
