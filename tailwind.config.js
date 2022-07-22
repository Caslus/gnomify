/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {},
	plugins: [require("daisyui")],

	daisyui: {
		themes: [
			{
				gnome: {
					primary: "#d62828",
					neutral: "#1a1a1a",
					"base-100": "#222222",
				},
			},
		],
	},
};
