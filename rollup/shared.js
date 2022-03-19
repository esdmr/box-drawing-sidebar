import esbuild from 'rollup-plugin-esbuild';

/** @type {import('rollup').RollupOptions} */
const config = {
	strictDeprecations: true,
	plugins: [
		esbuild({
			minify: true,
			target: 'es2020',
		}),
	],
};

export default config;
