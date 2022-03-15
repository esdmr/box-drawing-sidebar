/** @type {{}} */
const vscodeApi = globalThis.acquireVsCodeApi?.();

const vscode = {
	postMessage(arg) {
		console.log('[post-message]', arg);
	},
	...vscodeApi,
};

export default vscode;
