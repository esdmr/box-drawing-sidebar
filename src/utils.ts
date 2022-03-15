import * as vscode from 'vscode';

class AssertionError extends Error {
	name = 'AssertionError';
}

export function assert(condition: boolean, message: string): asserts condition {
	if (!condition) {
		throw new AssertionError(message);
	}
}

export function disposeAll(disposables: Iterable<vscode.Disposable>) {
	for (const item of disposables) {
		item.dispose();
	}
}
