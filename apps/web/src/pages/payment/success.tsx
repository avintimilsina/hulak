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
			if (router.query?.product_identity && router.query?.token) {
				await fetch("/api/update-order", {
					method: "POST",
					body: JSON.stringify({
						orderId: router.query.product_identity,
						token: router.query.token,
						amount: router.query.amount,
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
