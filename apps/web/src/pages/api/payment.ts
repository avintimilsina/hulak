/* eslint-disable no-console */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { APP_URL } from "../../../constants";

// ? This is the API route for initiating the new payment gateway of khalti

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	// Only allow POST requests to this API route (for security)
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}
	// When the payment is initiated, the frontend will send the request to this API route where we will send the request to khalti and get the response and send it back to the frontend
	const resposne = await fetch(
		"https://a.khalti.com/api/v2/epayment/initiate/",
		{
			method: "POST",
			body: JSON.stringify({
				// When the payment is successful, the user will be redirected to the success page
				return_url: `${APP_URL}/payment/success`,
				website_url: APP_URL,
				...req.body,
			}),
			headers: {
				"content-type": "application/json",
				Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`, // Replace LIVE_SECRET_KEY with your live secret key
			},
		}
	);

	// Get the response from khalti with the payment details and the payment status
	const khaltiResponse = await resposne.json();

	console.log(khaltiResponse);

	res.status(200).json({ ...khaltiResponse });
}
