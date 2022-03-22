import esbuild from 'rollup-plugin-esbuild';
import {nodeResolve} from '@rollup/plugin-node-resolve';

/** @type {import('rollup').RollupOptions} */
const config = {
	strictDeprecations: true,
	plugins: [
		nodeResolve({
			extensions: ['.ts', '.mjs', '.js', '.json', '.node'],
		}),
		esbuild({
			minify: true,
			target: 'es2020',
		}),
	],
};

export default config;
