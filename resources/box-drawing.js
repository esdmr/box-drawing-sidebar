/// <reference types="vscode"/>
const vscode = globalThis.acquireVsCodeApi?.() ?? {
	postMessage: (...args) => { console.log('[post-message]', ...args); }
};

const chars = [
	[
		[
			['┌', '─', '┐'],
			['│', ' ', '│'],
			['└', '─', '┘'],
		],
		[
			['╭', '┬', '╮'],
			['├', '┼', '┤'],
			['╰', '┴', '╯'],
		],
		[
			['', '╷', ''],
			['╶', '┼', '╴'],
			['', '╵', ''],
		],
		[
			['╌', '╌', '╌'],
			['┄', '┄', '┄'],
			['┈', '┈', '┈'],
		],
		[
			['╎', '┆', '┊'],
			['╎', '┆', '┊'],
			['╎', '┆', '┊'],
		],
	],

	[
		[
			['┏', '━', '┓'],
			['┃', ' ', '┃'],
			['┗', '━', '┛'],
		],
		[
			['┏', '┳', '┓'],
			['┣', '╋', '┫'],
			['┗', '┻', '┛'],
		],
		[
			['', '╻', ''],
			['╺', '╋', '╸'],
			['', '╹', ''],
		],
		[
			['╍', '╍', '╍'],
			['┅', '┅', '┅'],
			['┉', '┉', '┉'],
		],
		[
			['╏', '┇', '┋'],
			['╏', '┇', '┋'],
			['╏', '┇', '┋'],
		],
	],

	[
		[
			['╔', '═', '╗'],
			['║', ' ', '║'],
			['╚', '═', '╝'],
		],
		[
			['╔', '╦', '╗'],
			['╠', '╬', '╣'],
			['╚', '╩', '╝'],
		],
		[
			['╲', '', '╱'],
			['', '╳', ''],
			['╱', '', '╲'],
		],
	],
];

const sizeTest = document.createElement('button');
sizeTest.classList.add('cmd', 'cmd-auto-sized');
sizeTest.innerText = '┼';
sizeTest.style.visibility = 'hidden';
document.body.append(sizeTest);
const {width} = sizeTest.getBoundingClientRect();
sizeTest.remove();
document.body.style.setProperty('--cmd-width', `${width}px`);

const elemGroupContainer = document.createElement('div');
document.body.append(elemGroupContainer);
elemGroupContainer.classList.add('group-container');

for (const blockLine of chars) {
	const elemGroup = document.createElement('div');
	elemGroupContainer.append(elemGroup);
	elemGroup.classList.add('group');

	for (const block of blockLine) {
		const elemColumn = document.createElement('div');
		elemGroup.append(elemColumn);
		elemColumn.classList.add('column');

		for (const line of block) {
			const elemLine = document.createElement('div');
			elemColumn.append(elemLine);
			elemLine.classList.add('line');

			for (const char of line) {
				const elemCmd = document.createElement('button');
				elemLine.append(elemCmd);
				elemCmd.classList.add('cmd');
				elemCmd.innerText = char === ' ' ? '␠' : char;
				elemCmd.onclick = () => vscode.postMessage?.({
					type: 'insertSnippet',
					snippet: char,
				});
			}
		}
	}
}
