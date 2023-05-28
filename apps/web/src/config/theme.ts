// pages/_app.js

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
	brand: {
		"50": "#FFEFE5",
		"100": "#FFD2B8",
		"200": "#FFB48A",
		"300": "#FF975C",
		"400": "#FF7A2E",
		"500": "#FF5D00",
		"600": "#CC4A00",
		"700": "#993800",
		"800": "#662500",
		"900": "#331300",
	},
};

const theme = extendTheme({ colors });

export default theme;
