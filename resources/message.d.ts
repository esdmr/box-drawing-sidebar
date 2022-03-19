export type CustomEventListenerLike<T extends Event> =
	| ((event: T) => void)
	| {handleEvent(event: T): void};

export class MessageHandler extends EventTarget {
	// eslint-disable-next-line @typescript-eslint/ban-types
	addEventListener(type: string, callback: CustomEventListenerLike<CustomEvent> | null, options?: AddEventListenerOptions | boolean): void;
	// eslint-disable-next-line @typescript-eslint/ban-types
	removeEventListener(type: string, callback: CustomEventListenerLike<CustomEvent> | null, options?: AddEventListenerOptions | boolean): void;
	fire(message: unknown): void;
}
