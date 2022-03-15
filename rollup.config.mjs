
import esbuild from 'rollup-plugin-esbuild';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: 'src/extension.ts',
	output: {
		file: 'build/extension.js',
		format: 'cjs',
		compact: true,
		generatedCode: 'es2015',
		interop: 'auto',
		sourcemap: true,
	},
	external: 'vscode',
	strictDeprecations: true,
	plugins: [
		esbuild({
			minify: true,
			target: 'es2020',
		}),
	],
};

export default config;
