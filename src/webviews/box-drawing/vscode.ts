declare global {
	// eslint-disable-next-line no-var
	var acquireVsCodeApi: () => {
		postMessage(message: unknown, transfer?: unknown): void;
		getState(): void;
		setState(newState: unknown): void;
	};
}

const vscode = {
	...globalThis.acquireVsCodeApi(),
	onDidReceiveMessage(handler: (data: any) => void) {
		window.addEventListener('message', ({data}) => {
			handler(data);
		});
	},
};

export default vscode;
