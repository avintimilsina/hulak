// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdminInit from "../../../components/helpers/firebaseAdminInit";

// Initializing firebase admin snippet
const { db } = firebaseAdminInit();

type Data = {
	orders?: any;
	order?: any;
};

type Errors = {
	message: string;
	error: string;
};

// This API route gives the details of the orders placed by the user either by the orderId or by the userId
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Errors>
) {
	// validating the API key provided by the admin
	try {
		const keyCheck = await db
			.collection("keys")
			.doc(req.headers.key as string)
			.get();

		if (!keyCheck.exists) {
			res.status(401).json({
				message: "Unauthorized",
				error: "Invalid API Key",
			});
			return;
		}

		if (!keyCheck.data()?.isActive) {
			res.status(401).json({
				message: "Unauthorized",
				error: "Expired API Key",
			});
			return;
		}

		const { userId } = keyCheck.data() as any;
		// GET method is used to get all the orders placed by the user
		if (req.method === "GET") {
			const data: any = [];
			// it fetches all the orders placed by the user whose userId is provided in the request header
			const querySnapshot = await db
				.collection("orders")
				.where("userId", "==", userId)
				.get();
			querySnapshot.forEach((doc: any) => {
				data.push(doc.data());
			});

			res.status(200).json({ orders: data });
		} else {
			//  it fetches a specific order placed by the user where the orderId matches with the id provided in the request body
			const data = await db
				.collection("orders")
				.doc(req.body.id as string)
				.get();

			if (data.data()?.userId !== userId) {
				res.status(401).json({
					message: "Unauthorized",
					error: "Invalid User",
				});
				return;
			}
			res.status(200).json({ order: data.data() });
		}
	} catch (error: any) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
}
