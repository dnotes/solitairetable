const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		boxShadow: {
			DEFAULT: '0 0 4px 1px rgba(0,0,0,.1)'
		},
		extend: {}
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),
	],
};

module.exports = config;
