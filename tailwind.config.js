module.exports = {
	mode: 'jit',
	purge: {
		mode: 'layers',
		layers: ['base', 'components', 'utilities'],
		content: ['**/*.php'],
	},
	theme: {
		fontFamily: {},
		extend: {},
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')],
};
