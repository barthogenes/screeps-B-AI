/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use strict";

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import clear from 'rollup-plugin-clear';
import screeps from 'rollup-plugin-screeps';

let cfg;
const dest = process.env.DEST;
if (!dest) {
	console.log("No destination specified - code will be compiled but not uploaded");
}
else {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
	cfg = require("./screeps.json")[dest];
	if (cfg == null)
		throw new Error("Invalid upload destination");
}

export default {
	input: "src/main.ts",
	output: {
		file: "dist/main.js",
		format: "cjs",
		sourcemap: true
	},
	plugins: [
		clear({ targets: ["dist"] }),
		resolve(),
		commonjs(),
		typescript({ tsconfig: "./tsconfig.json" }),
		screeps({ config: cfg, dryRun: cfg == null }),
	]
}
