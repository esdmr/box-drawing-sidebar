import child from 'node:child_process';

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<void>}
 */
export async function spawn(command, args) {
	return new Promise((resolve, reject) => {
		const process = child.spawn(command, args, {
			stdio: 'inherit',
		});

		let done = false;

		process.once('error', error => {
			if (!done) {
				reject(error);
				done = true;
			}
		});

		process.once('exit', code => {
			if (!done) {
				if (code) {
					reject(new Error(`Process failed with error code: ${code}`));
				} else {
					resolve();
				}

				done = true;
			}
		});
	});
}
