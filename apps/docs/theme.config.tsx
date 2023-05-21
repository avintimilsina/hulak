/* eslint-disable @next/next/no-img-element */
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
	logo: <img src="https://hulak.vercel.app/logo.svg" alt="Logo" />,
	project: {
		link: "https://github.com/avintimilsina/hulak",
	},
	// chat: {
	// 	link: "https://discord.com",
	// },
	docsRepositoryBase: "https://hulakdocs.vercel.app/",
	footer: {
		text: "Hulak API documentation ©2023 by Avin Timilsina",
	},
};

export default config;
