import * as vscode from 'vscode';
import {assert, disposeAll} from './utils.js';

interface Message {
	[key: string]: unknown;
	type: string;
}

function isMessage(value: any): value is Message {
	return typeof value === 'object'
		&& value !== null
		&& typeof value.type === 'string';
}

export class MessageHandler extends vscode.Disposable {
	private readonly map = new Map<string, vscode.EventEmitter<Message>>();

	constructor() {
		super(() => {
			disposeAll(this.map.values());
		});
	}

	getEvent(command: string) {
		let emitter = this.map.get(command);

		if (!emitter) {
			emitter = new vscode.EventEmitter();
			this.map.set(command, emitter);
		}

		return emitter.event;
	}

	fire(message: unknown) {
		assert(isMessage(message), 'Message does not have a valid type');

		const emitter = this.map.get(message.type);

		assert(emitter !== undefined, `Message has an unknown type: ${message.type}`);
		emitter.fire(message);
	}
}
