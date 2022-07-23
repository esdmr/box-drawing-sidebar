#!/usr/bin/env node
import fs from 'node:fs/promises';
import process from 'node:process';
import {execaCommand} from 'execa';

/**
 * @param {Record<string, any>} packageMeta
 */
function processPackageJson(packageMeta) {
	// Cleanup package.json
	delete packageMeta.type;
	delete packageMeta.scripts;
	delete packageMeta.devDependencies;
	delete packageMeta.engines.node;
	delete packageMeta.engines.pnpm;
	delete packageMeta.packageManager;
	delete packageMeta.pnpm;

	return packageMeta;
}

/** @type {import('execa').Options} */
const options = {
	stdio: 'inherit',
};

console.log('corepack pnpm install');
await execaCommand('corepack pnpm install --prod=false', options);

console.log('corepack pnpm run build');
await execaCommand('corepack pnpm run build', options);

console.log('corepack pnpm run lint');
await execaCommand('corepack pnpm run lint', options);

const packageJson = await fs.readFile('package.json', 'utf8');
const newPackageJson = JSON.stringify(processPackageJson(JSON.parse(packageJson)));

try {
	console.log('mv package.json …');
	await fs.rename('package.json', '.package.dev.json');

	console.log('new package.json');
	await fs.writeFile('package.json', newPackageJson);
} catch (error) {
	console.error(error);

	console.error('# Reverting changes to package.json');
	await fs.writeFile('package.json', packageJson);

	console.error('rm …');
	await fs.rm('.package.dev.json', {force: true});

	process.exit(1);
}
