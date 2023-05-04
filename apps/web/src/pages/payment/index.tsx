/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Heading, VStack } from "@chakra-ui/react";

const PaymentPage = () => {
	const handleSubmission = async () => {
		const response = await fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				amount: 1300,
				purchase_order_id: "test12",
				purchase_order_name: "test",
				customer_info: {
					name: "Ashim Upadhaya",
					email: "example@gmail.com",
					phone: "9811496763",
				},
				amount_breakdown: [
					{
						label: "Mark Price",
						amount: 1000,
					},
					{
						label: "VAT",
						amount: 300,
					},
				],
				product_details: [
					{
						identity: "1234567890",
						name: "Khalti logo",
						total_price: 1300,
						quantity: 1,
						unit_price: 1300,
					},
				],
			}),
		});

		const { pidx, payment_url } = await response.json();
		console.log("PIXD", pidx);
		window.location.assign(payment_url);
	};
	return (
		<Grid placeItems="center" h="100vh">
			<VStack gap={4}>
				<Heading>Payment</Heading>
				<Button onClick={handleSubmission}>Proceed with Payment</Button>
			</VStack>
		</Grid>
	);
};

export default PaymentPage;
