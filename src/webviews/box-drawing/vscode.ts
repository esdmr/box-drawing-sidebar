/* eslint-env browser */
import parentLogger from './logger.js';

const logger = parentLogger.nest('vscodeApiShim');

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
		logger.log('postMessage', message, transfer);
	},
	getState() {
		logger.log('getState');
	},
	setState(newState: unknown) {
		logger.log('setState', newState);
	},
	onDidReceiveMessage(handler: (data: any) => void) {
		window.addEventListener('message', ({data}) => {
			handler(data);
		});
	},
	...globalThis.acquireVsCodeApi?.(),
};

export default vscode;
