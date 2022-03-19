interface VsCodeApi {
	postMessage (message: unknown, transfer?: unknown): void;
	getState (): void;
	setState (newState: unknown): void;
	onDidReceiveMessage (handler: (data: any) => void): void;
}

declare global {
	// eslint-disable-next-line no-var
	var acquireVsCodeApi: (() => Partial<VsCodeApi>) | undefined;
}

declare const vscode: VsCodeApi;
export default vscode;
