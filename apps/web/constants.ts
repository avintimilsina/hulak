export const PROD = process.env.NODE_ENV === "production";

export const APP_URL = !PROD
	? "http://localhost:3000"
	: "https://hulak.vercel.app";
