/* eslint-env browser */

import vscode from './vscode.js';

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

const sizeTest = document.createElement('button');
sizeTest.classList.add('cmd', 'cmd-auto-sized');
sizeTest.textContent = '┼';
sizeTest.style.visibility = 'hidden';
document.body.append(sizeTest);
const {width, height} = sizeTest.getBoundingClientRect();
sizeTest.remove();
document.body.style.setProperty('--cmd-width', `${width}px`);
document.body.style.setProperty('--cmd-height', `${height}px`);

const gridElement = document.createElement('div');
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
			cmdElement.disabled = true;
			cmdElement.ariaHidden = 'true';
			cmdElement.setAttribute('role', 'presentation');
		} else {
			cmdElement.textContent = char === ' ' ? '␠' : char;

			cmdElement.addEventListener('click', () => vscode.postMessage({
				type: 'insertSnippet',
				snippet: char,
			}));
		}
	}
}
