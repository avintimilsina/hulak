// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdminInit from "../../../components/helpers/firebaseAdminInit";

const { db } = firebaseAdminInit();

type Data = {
	orders?: any;
	order?: any;
};

type Errors = {
	message: string;
	error: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Errors>
) {
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
		if (req.method === "GET") {
			const data: any = [];
			const querySnapshot = await db
				.collection("orders")
				.where("userId", "==", userId)
				.get();
			querySnapshot.forEach((doc: any) => {
				data.push(doc.data());
			});

			res.status(200).json({ orders: data });
		} else {
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
