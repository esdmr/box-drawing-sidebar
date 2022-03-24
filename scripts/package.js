#!/usr/bin/env node
import {spawn} from './child-process.js';

await spawn('pnpm', ['run', 'prepack']);

try {
	await spawn('pnpm', ['run', 'build']);
} finally {
	await spawn('pnpm', ['run', 'postpack']);
}
