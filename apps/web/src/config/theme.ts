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

		// "50": "#FDECE7",
		// "100": "#FAC9BC",
		// "200": "#F7A691",
		// "300": "#F58366",
		// "400": "#F2603B",
		// "500": "#EF3D10",
		// "600": "#BF310D",
		// "700": "#8F250A",
		// "800": "#5F1807",
		// "900": "#300C03",
	},
};

const theme = extendTheme({ colors });

export default theme;
