/* eslint-disable @typescript-eslint/naming-convention */
import useLocalStorage from "@/components/hooks/useLocalStorage";
import DestinationForm from "@/components/pages/create/DestinationForm";
import SourceForm from "@/components/pages/create/SourceForm";
import SustinableForm from "@/components/pages/create/SustinableForm";
import WhatForm from "@/components/pages/create/WhatForm";
import Step from "@/components/ui/steps/Step";
import StepContent from "@/components/ui/steps/StepContent";
import Steps from "@/components/ui/steps/Steps";
import useSteps from "@/components/ui/steps/useSteps";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../firebase";

const defaultValues = {
	// Source
	source: {
		country: "",
		name: "",
		contactName: "",
		addressLine1: "",
		addressLine2: "",
		zip: "",
		city: "",
		state: "",
		email: "",
		phoneNumber: "",
	},

	// Destination
	destination: {
		country: "",
		name: "",
		contactName: "",
		addressLine1: "",
		addressLine2: "",
		zip: "",
		city: "",
		state: "",
		email: "",
		phoneNumber: "",
	},

	// What
	package: {
		weight: "",
		length: "",
		width: "",
		height: "",
		value: "",
		description: "",
	},

	// Sustinable
	isLithiumIncluded: false,
	isDryIceIncluded: false,
	isSignatureIncluded: false,
	isOversizedPackageIncluded: false,
	isCarbonNeutral: false,
	deliverOnlyToReceiver: false,
};
const AddressSchema = Yup.object({
	country: Yup.string().required("Required"),
	name: Yup.string().required("Required"),
	contactName: Yup.string().required("Required"),
	addressLine1: Yup.string().required("Required"),
	addressLine2: Yup.string().required("Required"),
	zip: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().required("Required"),
	email: Yup.string().required("Required").email("Invalid email address"),
	phoneNumber: Yup.string()
		.required("Required")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		),
});
const OrderSchema = Yup.object({
	// Source
	source: AddressSchema,
	destination: AddressSchema,

	package: Yup.object({
		weight: Yup.string().required("Required"),
		length: Yup.string().required("Required"),
		width: Yup.string().required("Required"),
		height: Yup.string().required("Required"),
		value: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
	}),
});
const CreateOrder = () => {
	const [currentUser] = useAuthState(auth);
	const router = useRouter();
	const [, setOrder] = useLocalStorage("order", {
		...defaultValues,
		status: "TEMP",
		pidx: "",
	});
	const { nextStep, prevStep, activeStep } = useSteps({
		initialStep: 0,
	});
	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={OrderSchema}
			onSubmit={async (values, action) => {
				if (!currentUser?.displayName || !currentUser?.email) {
					router.push("/auth/login");
					return;
				}

				setOrder({
					...values,
					status: "INITIATED",
					pidx: "",
				});

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
							name: currentUser.displayName,
							email: currentUser.email,
							phone: currentUser?.phoneNumber ?? "9800000000",
						},
						amount_breakdown: [
							{
								label: "Delivery Charges",
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
								name: "Delivery Charges",
								total_price: 1300,
								quantity: 1,
								unit_price: 1300,
							},
						],
					}),
				});

				const { pidx, payment_url } = await response.json();
				setOrder((prev) => ({
					...prev,
					pidx,
				}));
				window.location.assign(payment_url);

				action.resetForm();
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Box
						mx="auto"
						maxW="4xl"
						py="10"
						px={{ base: "6", md: "8" }}
						minH="400px"
					>
						<Steps activeStep={activeStep}>
							<Step title="Where are you shipping from?">
								<StepContent>
									<Stack shouldWrapChildren spacing="4">
										<Text>
											For each ad campaign that you create, you can control how
											much you&apos;re willing to spend on clicks and
											conversions, which networks and geographical locations you
											want your ads to show on, and more.
										</Text>
										<SourceForm />
										<HStack>
											<Button size="sm" variant="ghost" isDisabled>
												Back
											</Button>
											<Button size="sm" onClick={nextStep}>
												Next
											</Button>
										</HStack>
									</Stack>
								</StepContent>
							</Step>
							<Step title="Where is your shipping going?">
								<StepContent>
									<Stack shouldWrapChildren spacing="4">
										<Text>
											An ad group contains one or more ads which target a shared
											set of keywords.
										</Text>
										<DestinationForm />
										<HStack>
											<Button size="sm" onClick={prevStep} variant="ghost">
												Back
											</Button>
											<Button size="sm" onClick={nextStep}>
												Next
											</Button>
										</HStack>
									</Stack>
								</StepContent>
							</Step>
							<Step title="What kind of packaging are you using?">
								<StepContent>
									<Stack shouldWrapChildren spacing="4">
										<Text>
											Try out different ad text to see what brings in the most
											customers, and learn how to enhance your ads using
											features like ad extensions. If you run into any problems
											with your ads, find out how to tell if they&apos;re
											running and how to resolve approval issues.
										</Text>
										<WhatForm />
										<HStack>
											<Button size="sm" onClick={prevStep} variant="ghost">
												Back
											</Button>
											<Button size="sm" onClick={nextStep}>
												Next
											</Button>
										</HStack>
									</Stack>
								</StepContent>
							</Step>
							<Step title="Almost Done. Let's check a few more details.">
								<StepContent>
									<Stack shouldWrapChildren spacing="4">
										<Text>
											Try out different ad text to see what brings in the most
											customers, and learn how to enhance your ads using
											features like ad extensions. If you run into any problems
											with your ads, find out how to tell if they&apos;re
											running and how to resolve approval issues.
										</Text>
										<SustinableForm />
										<HStack>
											<Button size="sm" onClick={prevStep} variant="ghost">
												Back
											</Button>
											<Button size="sm" onClick={nextStep}>
												Finish
											</Button>
										</HStack>
									</Stack>
								</StepContent>
							</Step>
						</Steps>
						<HStack
							display={activeStep === 4 ? "flex" : "none"}
							mt="10"
							spacing="4"
							shouldWrapChildren
						>
							<Text>All steps completed - you&apos;re finished</Text>
							<Button
								size="sm"
								onClick={prevStep}
								variant="outline"
								verticalAlign="baseline"
							>
								Back
							</Button>

							<Button
								type="submit"
								colorScheme="blue"
								size="sm"
								fontSize="md"
								isLoading={props.isSubmitting}
							>
								Create Order
							</Button>
						</HStack>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default CreateOrder;
