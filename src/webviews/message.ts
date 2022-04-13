interface Message {
	[key: string]: unknown;
	type: string;
}

function isMessage(value: any): value is Message {
	return typeof value === 'object'
		&& value !== null
		&& typeof value.type === 'string';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class MessageHandler<Inbound> extends EventTarget {
	fire(message: any) {
		if (!isMessage(message)) {
			throw new TypeError('Message does not have a valid type');
		}

		this.dispatchEvent(new CustomEvent(message.type, {
			detail: message,
		}));
	}
}

export type CustomEventListenerLike<T extends Event> =
	| ((event: T) => void)
	| {handleEvent(event: T): void};

export interface MessageHandler<Inbound> extends EventTarget {
	addEventListener<K extends Extract<keyof Inbound, string>>(type: K, callback: CustomEventListenerLike<CustomEvent<Inbound[K] & {type: K}>> | null, options?: AddEventListenerOptions | boolean): void;
	removeEventListener<K extends Extract<keyof Inbound, string>>(type: K, callback: CustomEventListenerLike<CustomEvent<Inbound[K] & {type: K}>> | null, options?: AddEventListenerOptions | boolean): void;
}
