import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Mode, plugin as mdPlugin } from "vite-plugin-markdown"
import mdAttrs from "markdown-it-attrs"
import mdit from "markdown-it"

const markdownIt = mdit({
    xhtmlOut:true,
    typographer:true,
}).use(mdAttrs)
const md = mdPlugin({mode:[Mode.HTML], markdownIt})

export default defineConfig(({ mode }) => {
	return {
		plugins: [
			md,
			sveltekit(),
		],
		define: {
			'process.env.NODE_ENV': mode === 'production' ? '"production"' : '"development"',
		},
		ssr: {
			noExternal: [
				'@fortawesome/free-solid-svg-icons',
				'@fortawesome/free-regular-svg-icons',
			]
		}
	}
});
