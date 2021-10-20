const config = {
	mode: "jit",
	purge: {
		content: ["./src/**/*.{html,js,svelte,ts}",],
		safelist: [
			'bottom-full',
			'top-full',
			'right-full',
			'left-full',
		],
	},
	theme: {
		boxShadow: {
			DEFAULT: '0 0 4px 1px rgba(0,0,0,.1)'
		},
		extend: {}
	},
	plugins: [
		require('tailwindcss-typography')({
			ellipsis: false,
			hyphens: false,
			kerning: false,
			textUnset: false,
		})
	]
};

module.exports = config;
