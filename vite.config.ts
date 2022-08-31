import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { Mode, plugin as mdPlugin } from "vite-plugin-markdown"
import sw from 'kit-sw-workbox'
import mdAttrs from "markdown-it-attrs"
import mdit from "markdown-it"

const markdownIt = mdit({
    xhtmlOut:true,
    typographer:true,
}).use(mdAttrs)
const md = mdPlugin({mode:[Mode.HTML], markdownIt})

const config: UserConfig = {
	plugins: [
		md,
		sw({
			routes: [
				'/',
				'/about',
				'/play',
			]
		}),
		sveltekit(),
	],
	ssr: {
		noExternal: [
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/free-regular-svg-icons',
		]
	}
};

export default config;
