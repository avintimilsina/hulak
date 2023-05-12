import useLocalStorage from "@/components/hooks/useLocalStorage";
import Result from "@/components/shared/Result";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "../../../firebase";

const SuccessPage = () => {
	const router = useRouter();
	const [order, setOrder] = useLocalStorage<any>("order");
	useEffect(() => {
		const runThisNow = async () => {
			if (router.query?.pidx && order) {
				await setDoc(
					doc(db, "orders", (router.query?.pidx as string) ?? "-"),
					{
						...order,
						khalti: { ...router.query },
						createdAt: serverTimestamp(),
					},
					{
						merge: true,
					}
				);
				setOrder(null);
			}
		};
		runThisNow();
	}, [order, router, setOrder]);

	return (
		<Result
			heading="Order Placed Successfully!"
			type="success"
			text=""
			dump={router.query}
		/>
	);
};

export default SuccessPage;
