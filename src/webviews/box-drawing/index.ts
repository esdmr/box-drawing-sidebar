/* eslint-env browser */
import vscode from './vscode';
import {MessageHandler} from './message';

const messageHandler = new MessageHandler();

const dialog = document.querySelector<HTMLDialogElement>('#no-open-documents');

if (!dialog) {
	throw new Error('Could not find the dialog');
}

// The dialog is a modal. The user should not be able to close it.
dialog.addEventListener('cancel', event => {
	event.preventDefault();
});

let pendingDialogTimeout: ReturnType<typeof setTimeout> | undefined;

messageHandler.addEventListener('onDidChangeActiveTextEditor', ({detail}) => {
	if (pendingDialogTimeout !== undefined) {
		clearTimeout(pendingDialogTimeout);
		pendingDialogTimeout = undefined;
	}

	// Switching between two open text editors sends two messages, one saying
	// that the current editor is not a text editor, and the other saying that
	// it is. By waiting just enough, we can avoid flashing the dialog.
	//
	// FIXME: There might be a better way to do this (possibly in the
	// extension)?
	pendingDialogTimeout = setTimeout(() => {
		if (detail.isTextEditorActive && dialog.open) {
			dialog.close();
			document.documentElement.classList.remove('scroll-disabled');
		} else if (!detail.isTextEditorActive && !dialog.open) {
			dialog.showModal();
			document.documentElement.classList.add('scroll-disabled');
		}
	}, 100);
});

vscode.onDidReceiveMessage(message => {
	messageHandler.fire(message);
});

const chars = [
	['┌', '─', '┐', '│', ' ', '│', '└', '─', '┘'],
	['╭', '┬', '╮', '├', '┼', '┤', '╰', '┴', '╯'],
	['', '╷', '', '╶', '┼', '╴', '', '╵', ''],
	['╌', '╌', '╌', '┄', '┄', '┄', '┈', '┈', '┈'],
	['╎', '┆', '┊', '╎', '┆', '┊', '╎', '┆', '┊'],
	['┏', '━', '┓', '┃', ' ', '┃', '┗', '━', '┛'],
	['┏', '┳', '┓', '┣', '╋', '┫', '┗', '┻', '┛'],
	['', '╻', '', '╺', '╋', '╸', '', '╹', ''],
	['╍', '╍', '╍', '┅', '┅', '┅', '┉', '┉', '┉'],
	['╏', '┇', '┋', '╏', '┇', '┋', '╏', '┇', '┋'],
	['╔', '═', '╗', '║', ' ', '║', '╚', '═', '╝'],
	['╔', '╦', '╗', '╠', '╬', '╣', '╚', '╩', '╝'],
	['╲', '', '╱', '', '╳', '', '╱', '', '╲'],
];

const {width, height} = getCmdRect();
document.documentElement.style.setProperty('--cmd-width', `${width}px`);
document.documentElement.style.setProperty('--cmd-height', `${height}px`);

const gridElement = document.createElement('main');
document.body.append(gridElement);
gridElement.classList.add('grid');

for (const item of chars) {
	const subGridElement = document.createElement('div');
	gridElement.append(subGridElement);
	subGridElement.classList.add('subgrid');

	for (const char of item) {
		const cmdElement = document.createElement('button');
		subGridElement.append(cmdElement);
		cmdElement.classList.add('cmd');

		if (char === '') {
			cmdElement.classList.add('cmd-hidden');
			cmdElement.disabled = true;
			cmdElement.ariaHidden = 'true';
			cmdElement.setAttribute('role', 'presentation');
		} else {
			cmdElement.textContent = char === ' ' ? '␠' : char;

			cmdElement.addEventListener('click', () => {
				vscode.postMessage({
					type: 'insertSnippet',
					snippet: char,
				});
			});
		}
	}
}

// TODO: Provide a way to send a parameter from the extension to webview,
// specially to avoid the initial first flash.
vscode.postMessage({
	type: 'loaded',
});

function getCmdRect() {
	const sizeTest = document.createElement('button');
	sizeTest.classList.add('cmd', 'cmd-auto-sized');
	sizeTest.textContent = '┼';
	sizeTest.style.visibility = 'hidden';
	document.body.append(sizeTest);

	const rect = sizeTest.getBoundingClientRect();
	sizeTest.remove();

	return rect;
}
