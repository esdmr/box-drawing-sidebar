#!/usr/bin/env node
import esbuild from 'esbuild';
import process from 'node:process';

const isProduction = process.env.NODE_ENV === 'production';

await esbuild.build({
	entryPoints: {
		'box-drawing': 'src/webviews/box-drawing/index.css',
	},
	outdir: 'resources',
	entryNames: '[dir]/[name]/index',
	minify: isProduction,
	sourcemap: true,
});
