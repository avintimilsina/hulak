/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Heading, VStack } from "@chakra-ui/react";
import KhaltiCheckout from "khalti-checkout-web";
import { useRouter } from "next/router";

const PaymentPage = () => {
	const router = useRouter();
	const handleSubmission = async () => {
		const checkout = new KhaltiCheckout({
			// replace this key with yours
			publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY,
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
			paymentPreference: [
				"KHALTI",
				"EBANKING",
				"MOBILE_BANKING",
				"CONNECT_IPS",
				"SCT",
			],
		});
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
