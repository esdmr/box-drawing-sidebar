/// <reference path="./vscode.d.ts" />
/* eslint-env browser */
const vscodeApi = globalThis.acquireVsCodeApi?.();

const vscode = {
	/**
	 * @param {unknown} message
	 * @param {unknown} transfer
	 */
	postMessage(message, transfer = undefined) {
		console.log('[box-drawing]', '[postMessage]', message, transfer);
	},
	getState() {
		console.log('[box-drawing]', '[getState]');
	},
	/**
	 * @param {unknown} newState
	 */
	setState(newState) {
		console.log('[box-drawing]', '[setState]', newState);
	},
	/**
	 * @param {(data: any) => void} handler
	 */
	onDidReceiveMessage(handler) {
		window.addEventListener('message', ({data}) => {
			handler(data);
		});
	},
	...vscodeApi,
};

export default vscode;
