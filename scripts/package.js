#!/usr/bin/env node
import {spawn} from './child-process.js';

await spawn('node', ['scripts/prepack.js']);

try {
	await spawn('pnpx', ['vsce', 'package', '--no-dependencies']);
} finally {
	await spawn('node', ['scripts/postpack.js']);
}
