// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AddressFormValues } from "@/components/pages/account/address/AddressForm";
import calculatePostage from "@/components/helpers/calculatePostage";
import { Timestamp } from "firebase-admin/firestore";
import { OrderSchema } from "@/pages/create-order";
import firebaseAdminInit from "../../../components/helpers/firebaseAdminInit";

//  Initializing firebase admin snippet
const { db } = firebaseAdminInit();

// Defining all the parameters that are required to create an order
type OrderType = {
	isOversizedPackageIncluded: boolean;
	package: {
		length: number;
		width: number;
		weight: number;
		description: string;
		value: number;
		height: number;
	};
	destination: AddressFormValues;
	deliverOnlyToReceiver: false;
	source: AddressFormValues;
	isDryIceIncluded: boolean;
	isCarbonNeutral: boolean;
	isSignatureIncluded: boolean;
	price: number;
	isLithiumIncluded: boolean;
};

type Data = {
	orderId: string;
	price: number;
	status: string;
	paymentStatus: string;
};

type Errors = {
	message: string;
	error: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data | Errors>
) {
	// Only allow POST requests to this API route (for security)
	if (req.method === "GET") {
		res.status(405).json({
			message: "Method Not Allowed",
			error: "Only POST requests allowed",
		});
		return;
	}
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

		//  validates the order details provided using OrderSchema from the create-order page
		try {
			OrderSchema.validateSync(req.body.order);
		} catch (err: any) {
			res.status(400).json({
				message: "Bad Request",
				error: `${err.path} is ${err.errors[0]}`,
			});
			return;
		}

		const data = req.body.order satisfies OrderType;

		// if all the value of the order is valid, the order is created and the order details are written to the firestore database along with the payment details and the calculated price using the calculatePostage function
		const { distance, postageCost, volume } = await calculatePostage(
			data.package.height!,
			data.package.weight!,
			data.package.length!,
			data.package.width!,
			data.source.city!,
			data.destination.city!,
			{
				isDryIceIncluded: data.isDryIceIncluded,
				isLithiumIncluded: data.isLithiumIncluded,
				isOversizedPackageIncluded: data.isOversizedPackageIncluded,
				isSignatureIncluded: data.isSignatureIncluded,
			}
		);
		// order details are written to the firestore database and the order status is set to PLACED
		const writeRes = await db.collection("orders").add({
			...data,
			userId,
			createdAt: Timestamp.fromDate(new Date()),
			status: "PLACED",
			price: postageCost,
			distance,
			volume,
		});

		await db.collection("orders").doc(writeRes.id).set(
			{
				orderId: writeRes.id,
			},
			{ merge: true }
		);
		// payment details are written to the firestore database and the payment status is set to COMPLETED
		await db
			.collection("orders")
			.doc(writeRes.id)
			.collection("payments")
			.add({
				createdAt: Timestamp.fromDate(new Date()),
				fee: 0,
				orderId: writeRes.id,
				pidx: "API INITIATED",
				refunded: false,
				status: "COMPLETED",
				total_amount: postageCost,
				transaction_id: "API INITIATED",
				userId,
			});

		res.status(200).json({
			orderId: writeRes.id,
			price: postageCost,
			status: "PLACED",
			paymentStatus: "COMPLETED",
		});
	} catch (error: any) {
		res
			.status(500)
			.json({ message: "Internal Server Error", error: error.message });
	}
}
