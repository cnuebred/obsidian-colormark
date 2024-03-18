import esbuild from "esbuild"
import { copy } from 'esbuild-plugin-copy'
import process from "process"
import builtins from "builtin-modules"
import dotenv from 'dotenv'
dotenv.config();

const banner =
	`/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/
`;

const prod = (process.argv[2] === "production");
const dev = (process.argv[2] === "dev");

const base_relative_path = process.env.BASE_BUILD_PATH

const gen_copy = () => {
	return ['main.js', 'manifest.json', 'data.json', 'styles.css'].map(item => {
		return copy(
			{
				resolveFrom: 'cwd',
				assets: {
					from: [`./${item}`],
					to: [`${base_relative_path}${item}`],
				},
				watch: true,
			}
		)
	})
}


const context = await esbuild.context({
	banner: {
		js: banner,
	},
	entryPoints: ["main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "./main.js",
	plugins: [
		...(dev ? gen_copy() : [])
	],
});

if (prod) {
	await context.rebuild();
	process.exit(0);
} else if(dev) {
	await context.watch();
}