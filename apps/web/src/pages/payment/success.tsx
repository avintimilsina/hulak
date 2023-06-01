import Result from "@/components/shared/Result";
import withProtected from "@/routes/withProtected";
import { useRouter } from "next/router";
import { useEffect } from "react";

// ? SuccessPage is a page where the user is redirected after the payment is successful

const SuccessPage = () => {
	const router = useRouter();
	useEffect(() => {
		const runThisNow = async () => {
			// It fetches the details about the order and displays it to the user
			if (router.query?.purchase_order_id && router.query?.pidx) {
				await fetch("/api/update-order", {
					method: "POST",
					body: JSON.stringify({
						pidx: router.query.pidx,
						orderId: router.query.purchase_order_id,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
			}
		};
		runThisNow();
	}, [router]);

	return (
		<Result
			heading="Order Placed Successfully!"
			type="success"
			text=""
			dump={router.query}
		/>
	);
};

export default withProtected(SuccessPage);
