/** @type {{}} */
const vscodeApi = globalThis.acquireVsCodeApi?.();

const vscode = {
	postMessage(message, transfer = undefined) {
		console.log('[box-drawing]', '[postMessage]', message, transfer);
	},
	getState() {
		console.log('[box-drawing]', '[getState]');
	},
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
