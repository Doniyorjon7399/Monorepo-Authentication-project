/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'../../packages/ui/**/*.{js,ts,jsx,tsx}', // agar @repo/ui ishlatilsa
	],
	theme: {
		extend: {},
	},
	plugins: [],
}
