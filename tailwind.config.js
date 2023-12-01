/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#f73725",
					secondary: "#ffd155",
					secondaryDark: "#f28500",
					accent: "#37cdbe",
					neutral: "#3d4451",
					"base-100": "#ffffff",
					"base-200": "#f9fafb",
					"base-300": "#d1d5db",
					"base-400": "#9ca3af",
					"content-100": "#10191a",
					"content-200": "#242526",
					"content-300": "#3a3b3c",
				},
			},
		],
	},

	plugins: [require("daisyui")],
};
