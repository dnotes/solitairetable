import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static"
import { plugin as mdPlugin } from "vite-plugin-markdown"
import mdAttrs from "markdown-it-attrs"
import mdit from "markdown-it"

const markdownIt = mdit({
    xhtmlOut:true,
    typographer:true,
}).use(mdAttrs)
const md = mdPlugin({mode:'html', markdownIt})

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
        vite: {
            plugins: [
                md,
            ]
        },
        adapter: adapter()
	},

    preprocess: [preprocess({
        postcss: true
    })]
};

export default config;
