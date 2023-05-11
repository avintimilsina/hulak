import useLocalStorage from "@/components/hooks/useLocalStorage";
import Result from "@/components/shared/Result";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { db } from "../../../firebase";

const SuccessPage = () => {
	const router = useRouter();
	const [order, setOrder] = useLocalStorage<any>("order");
	const khaltiInfo = router.query;
	useEffect(() => {
		const runThisNow = async () => {
			if (router.query?.pidx && order) {
				await setDoc(
					doc(db, "orders", (khaltiInfo?.pidx as string) ?? "-"),
					{
						...order,
						...khaltiInfo,
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
	}, [khaltiInfo, order, router, setOrder]);

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
