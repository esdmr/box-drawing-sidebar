import process from 'node:process';
import esbuild from 'rollup-plugin-esbuild';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('rollup').RollupOptions} */
const config = {
	strictDeprecations: true,
	plugins: [
		nodeResolve({
			extensions: ['.ts', '.mjs', '.js', '.json', '.node'],
		}),
		esbuild({
			minify: isProduction,
			target: 'es2020',
		}),
	],
};

export default config;
