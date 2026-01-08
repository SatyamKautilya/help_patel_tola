// tailwind.config.js
const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		// ... your app paths
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				charcoal: {
					DEFAULT: '#1C1C1C',
					soft: '#222222',
					muted: '#2A2A2A',
					border: '#333333',
				},
				gold: {
					DEFAULT: '#D4AF37',
					soft: '#F2D28B',
				},
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui()],
	safelist: [
		'border-emerald-500',
		'border-amber-500',
		'border-violet-500',
		'border-rose-500',
		'border-cyan-500',
		'border-indigo-500',

		'text-emerald-800',
		'text-amber-800',
		'text-violet-800',
		'text-rose-800',
		'text-cyan-800',
		'text-indigo-800',

		'bg-emerald-50',
		'bg-amber-50',
		'bg-violet-50',
		'bg-rose-50',
		'bg-cyan-50',
		'bg-indigo-50',
	],
};
