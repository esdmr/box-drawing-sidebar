/* eslint-env browser */
interface VsCodeApi {
	postMessage(message: unknown, transfer?: unknown): void;
	getState(): void;
	setState(newState: unknown): void;
	onDidReceiveMessage(handler: (data: any) => void): void;
}

declare global {
	// eslint-disable-next-line no-var
	var acquireVsCodeApi: (() => Partial<VsCodeApi>) | undefined;
}

const vscode: VsCodeApi = {
	postMessage(message: unknown, transfer: unknown = undefined) {
		console.log('[box-drawing-sidebar]', '[box-drawing]', '[vscodeApiShim.postMessage]', message, transfer);
	},
	getState() {
		console.log('[box-drawing-sidebar]', '[box-drawing]', '[vscodeApiShim.getState]');
	},
	setState(newState: unknown) {
		console.log('[box-drawing-sidebar]', '[box-drawing]', '[vscodeApiShim.setState]', newState);
	},
	onDidReceiveMessage(handler: (data: any) => void) {
		window.addEventListener('message', ({data}) => {
			handler(data);
		});
	},
	...globalThis.acquireVsCodeApi?.(),
};

export default vscode;
