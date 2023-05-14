// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import firebaseAdminInit from "../../../components/helpers/firebaseAdminInit";

const { db } = firebaseAdminInit();

type Data = {
	orders: any;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const data: any = [];
	const querySnapshot = await db.collectionGroup("orders").get();
	querySnapshot.forEach((doc: any) => {
		data.push(doc.data());
	});

	res.status(200).json({ orders: data });
}
