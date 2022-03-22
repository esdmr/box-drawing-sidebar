import sharedConfig, {isProduction} from './shared.js';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: {
		'box-drawing': 'src/webviews/box-drawing/index.ts',
	},
	output: {
		dir: 'resources',
		entryFileNames: '[name]/index.js',
		compact: isProduction,
		generatedCode: 'es2015',
		interop: 'auto',
		sourcemap: true,
	},
	...sharedConfig,
};

export default config;
