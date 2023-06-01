/* eslint-disable @next/next/no-title-in-document-head */
import theme from "@/config/theme";
import { ColorModeScript } from "@chakra-ui/react";
import { Html, Head, Main, NextScript } from "next/document";

// ? Document is a file that is used to link the custom fonts and the custom css files to the application along with the title of the application and the initial color mode of the application

const Document = () => (
	<Html lang="en">
		<Head>
			<title>Hulak</title>
		</Head>
		<body>
			<ColorModeScript initialColorMode={theme.config.initialColorMode} />
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default Document;
