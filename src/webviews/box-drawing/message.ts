interface Message {
	[key: string]: unknown;
	type: string;
}

function isMessage(value: any): value is Message {
	return typeof value === 'object'
		&& value !== null
		&& typeof value.type === 'string';
}

export type CustomEventListenerLike<T extends Event> =
	| ((event: T) => void)
	| {handleEvent(event: T): void};

export class MessageHandler extends EventTarget {
	fire(message: any) {
		if (!isMessage(message)) {
			throw new TypeError('Message does not have a valid type');
		}

		this.dispatchEvent(new CustomEvent(message.type, {
			detail: message,
		}));
	}
}

export interface MessageHandler extends EventTarget {
	addEventListener(type: string, callback: CustomEventListenerLike<CustomEvent> | null, options?: AddEventListenerOptions | boolean): void;
	removeEventListener(type: string, callback: CustomEventListenerLike<CustomEvent> | null, options?: AddEventListenerOptions | boolean): void;
}
