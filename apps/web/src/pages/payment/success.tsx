import useLocalStorage from "@/components/hooks/useLocalStorage";
import Result from "@/components/shared/Result";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SuccessPage = () => {
	const router = useRouter();
	const [order, setOrder] = useLocalStorage<any>("order");
	useEffect(() => {
		const runThisNow = async () => {
			if (router.query?.pidx && order) {
				await fetch("/api/update-order", {
					method: "POST",
					body: JSON.stringify({
						pidx: router.query.pidx,
						order,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
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
