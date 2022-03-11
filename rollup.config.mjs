
import esbuild from 'rollup-plugin-esbuild';

/** @type {import('rollup').RollupOptions} */
const config = {
	input: 'src/extension.ts',
	output: {
		file: 'build/extension.js',
		format: 'cjs',
		sourcemap: true,
	},
	external: 'vscode',
	plugins: [
		esbuild({
			minify: true,
			target: 'es2020',
		}),
	],
};

export default config;
