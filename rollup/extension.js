import sharedConfig, {isProduction} from './shared.js';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: 'src/extension/index.ts',
	output: {
		file: 'build/extension.js',
		format: 'cjs',
		compact: isProduction,
		generatedCode: 'es2015',
		interop: 'auto',
		sourcemap: true,
	},
	external: 'vscode',
	...sharedConfig,
};

export default config;
