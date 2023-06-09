// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdminInit from "../../components/helpers/firebaseAdminInit";

// ?  Initializing firebase admin snippet
const { db } = firebaseAdminInit();

// ? This is the API route for updating the order status and payment status in the firestore database

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	// Only allow POST requests to this API route (for security)
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}

	let verificationData = {};

	const verifyResponse = await fetch(
		"https://khalti.com/api/v2/payment/verify/",
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
				Authorization: `Key ${process.env.KHALTI_SECRET_KEY_DEPRECATED}`,
			},
			body: JSON.stringify({
				token: req.body.token,
				amount: req.body.amount,
			}),
		}
	);

	if (verifyResponse.status === 200) {
		verificationData = await verifyResponse.json();
	}

	const resposne = await fetch(
		`https://khalti.com/api/v2/payment/status/?token=${req.body.token}&amount=${req.body.amount}`,
		{
			method: "GET",
			headers: {
				"content-type": "application/json",
				Authorization: `Key ${process.env.KHALTI_SECRET_KEY_DEPRECATED}`,
			},
		}
	);
	const khalti = await resposne.json();
	// when the payment is successful, the details of the order and its payment is written to the firestore database under the orders collection
	const writePayment = await db
		.collection("orders")
		.doc(req.body.orderId)
		.collection("payments")
		.doc(req.body.token)
		.set(
			{
				...verificationData,
				...khalti,
				status:
					(khalti?.state?.toUpperCase() === "COMPLETE"
						? "COMPLETED"
						: khalti?.status?.toUpperCase()) ?? "FETCH ERROR",
			},
			{ merge: true }
		);

	// set the order status to PLACED when a new order is initiated
	const writeOrder = await db.collection("orders").doc(req.body.orderId).set(
		{
			status: "PLACED",
		},
		{ merge: true }
	);

	res.status(200).json({ paid: writePayment, firestore: writeOrder });
}
