/// <reference path="./message.d.ts" />
/* eslint-env browser */
/**
 * @param {any} value
 */
function isMessage(value) {
	return typeof value === 'object'
		&& value !== null
		&& typeof value.type === 'string';
}

export class MessageHandler extends EventTarget {
	/**
	 * @param {any} message
	 */
	fire(message) {
		if (!isMessage(message)) {
			throw new TypeError('Message does not have a valid type');
		}

		this.dispatchEvent(new CustomEvent(message.type, {
			detail: message,
		}));
	}
}
