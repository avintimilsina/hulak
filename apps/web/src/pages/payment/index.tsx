/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Heading, VStack } from "@chakra-ui/react";
import KhaltiCheckout from "khalti-checkout-web";
import { useRouter } from "next/router";

//! OLD DEPRECATED PAYMENT VERSION

// ? PaymentPage is a page where the user can pay for the order (made for testing purposes)

//* The main difference between the old and the new payment gateway is that the request is made from the client side in the old payment gateway and can be manipulated by the user if the user knows how to use the browser's developer tools but in the new payment gateway, the request is made from the server side and cannot be manipulated by the user

const PaymentPage = () => {
	const router = useRouter();
	const handleSubmission = async () => {
		// This uses KhaltiCheckout library to initiate payment where a popup is shown to the user to pay for the order
		const checkout = new KhaltiCheckout({
			// replace this key with yours

			publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,

			// Product identity and Name can be given as our own by passing props to the component but for testing purposes, I have used the default values
			productIdentity: "1234567890",
			productName: "Drogon",
			productUrl: "http://gameofthrones.com/buy/Dragons",
			eventHandler: {
				onSuccess(payload: any) {
					// hit merchant api for initiating verfication
					router.push({ pathname: "/payment/success", query: payload });
					console.log(payload);
				},
				// onError handler is optional
				onError(error: any) {
					// handle errors
					console.log(error);
				},
				onClose() {
					console.log("widget is closing");
				},
			},
			// paymentPreference indicates the payment methods that the user can use to pay for the order (Khalti, eBanking, Mobile Banking, Connect IPS, SCT)
			paymentPreference: [
				"KHALTI",
				"EBANKING",
				"MOBILE_BANKING",
				"CONNECT_IPS",
				"SCT",
			],
		});
		// this is the amount that the user needs to pay for the order which is in paisa and can be changed according to the order amount (but for testing purposes, I have used the default value)
		checkout.show({ amount: 1000 });
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
