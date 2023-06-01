/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Heading, VStack } from "@chakra-ui/react";

// ! NEW PAYMENT GATEWAY

// ? PaymentPage is a page where the user can pay for the order (made for testing purposes)

const PaymentPage = () => {
	const handleSubmission = async () => {
		// Here the request is made from the server side via api call
		const response = await fetch("/api/payment", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				// amount, purchase_order_id, purchase_order_name, customer_info, amount_breakdown, product_details are the required fields for the request which can be changed according to the order details but for testing purposes, I have used the default values
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

		// pidx is the payment id provided by the payment gateway and payment_url is the url where the user can pay for the order
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
