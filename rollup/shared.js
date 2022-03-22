import process from 'node:process';
import esbuild from 'rollup-plugin-esbuild';
import {nodeResolve} from '@rollup/plugin-node-resolve';

export const isProduction = process.env.NODE_ENV === 'production';

/** @type {import('rollup').RollupOptions} */
const config = {
	strictDeprecations: true,
	plugins: [
		// `.ts` files may import other `.ts` files via a `.js` extension. It
		// should resolve them.
		nodeResolve({
			// `node-resolve` does not operate on `.ts` files by default.
			extensions: ['.ts', '.mjs', '.js', '.json', '.node'],
			// Node.JS builtins are not available on VSCode Web.
			preferBuiltins: false,
			// We do not use the `commonjs` plugin (yet).
			modulesOnly: true,
		}),
		// It should format/minify.
		esbuild({
			minify: isProduction,
			target: 'es2020',
		}),
	],
};

export default config;
