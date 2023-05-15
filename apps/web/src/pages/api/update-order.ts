// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdminInit from "../../components/helpers/firebaseAdminInit";

const { db } = firebaseAdminInit();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method !== "POST") {
		res.status(405).send({ message: "Only POST requests allowed" });
		return;
	}
	const resposne = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
		method: "POST",
		body: JSON.stringify({
			pidx: req.body.pidx,
		}),
		headers: {
			"content-type": "application/json",
			Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
		},
	});
	const khalti = await resposne.json();

	const writePayment = await db
		.collection("orders")
		.doc(req.body.orderId)
		.collection("payments")
		.doc(req.body.pidx)
		.set(
			{
				khalti,
				status: khalti?.status?.toUpperCase(),
			},
			{ merge: true }
		);

	const writeOrder = await db.collection("orders").doc(req.body.orderId).set(
		{
			status: "PLACED",
		},
		{ merge: true }
	);

	res.status(200).json({ paid: writePayment, firestore: writeOrder });
}
