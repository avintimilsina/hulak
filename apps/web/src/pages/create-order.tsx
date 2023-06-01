/* eslint-disable @typescript-eslint/naming-convention */
import calculatePostage from "@/components/helpers/calculatePostage";
import DestinationForm from "@/components/pages/create/DestinationForm";
import SourceForm from "@/components/pages/create/SourceForm";
import SustinableForm from "@/components/pages/create/SustinableForm";
import WhatForm from "@/components/pages/create/WhatForm";
import Navbar from "@/components/ui/navbar";
import Step from "@/components/ui/steps/Step";
import StepContent from "@/components/ui/steps/StepContent";
import Steps from "@/components/ui/steps/Steps";
import useSteps from "@/components/ui/steps/useSteps";
import withProtected from "@/routes/withProtected";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	setDoc,
} from "firebase/firestore";
import { Form, Formik, FormikProps, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { useEffect } from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { auth, db } from "../../firebase";

// ? CreateOrder is a page where the user can place an order

// defaultValues for every field in the form is set to empty string under the defaultValues object
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
		weight: undefined,
		length: undefined,
		width: undefined,
		height: undefined,
		value: undefined,
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

// AddressSchema is used to validate the address fields in the form
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

// OrderSchema is used to validate the package details fields in the form
export const OrderSchema = Yup.object({
	// Source
	source: AddressSchema,
	destination: AddressSchema,

	package: Yup.object({
		weight: Yup.number().required("Required"),
		length: Yup.number().required("Required"),
		width: Yup.number().required("Required"),
		height: Yup.number().required("Required"),
		value: Yup.number().required("Required"),
		description: Yup.string().required("Required"),
	}),
});

const CreateOrder = () => {
	const [data, setData] = useLocalStorage("order", defaultValues);

	const [currentUser] = useAuthState(auth);
	const router = useRouter();

	// steps from the useSteps hook is used to navigate through the steps in the form (from the ui/steps folder)
	const { nextStep, prevStep, activeStep } = useSteps({
		initialStep: 0,
	});

	return (
		<>
			<Navbar />
			<Formik
				enableReinitialize
				initialValues={{ ...defaultValues, ...data }}
				validationSchema={OrderSchema}
				onSubmit={async (values, action) => {
					// if the user is not logged in, the user is redirected to the login page
					if (!currentUser?.displayName || !currentUser?.email) {
						router.push("/auth/login");
						return;
					}
					// when all the fields are filled, the postage cost, distance and volume of the package is calculated using the calculatePostage function
					const {
						postageCost,
						distance: calculatedDistance,
						volume: calculatedVolume,
					} = await calculatePostage(
						values.package.height!,
						values.package.weight!,
						values.package.length!,
						values.package.width!,
						values.source.city!,
						values.destination.city!,
						{
							isDryIceIncluded: values.isDryIceIncluded,
							isLithiumIncluded: values.isLithiumIncluded,
							isOversizedPackageIncluded: values.isOversizedPackageIncluded,
							isSignatureIncluded: values.isSignatureIncluded,
						}
					);

					// * For the new Payment API, the order details are added to the orders collection in the database along with the user details only when the payment is successful

					// ! The newly created order is added to the orders collection in the database along with the user details of the user who created the order (for Deprecated Payment API)

					const docRef = await addDoc(collection(db, "orders"), {
						...values,
						status: "INITIATED",
						price: postageCost,
						distance: calculatedDistance,
						volume: calculatedVolume,
						userId: currentUser.uid,
						createdAt: serverTimestamp(),
					});

					if (docRef.id) {
						setData(defaultValues as any);
					}

					// Payment is initiated using the payment api before writing the order details to the database
					// If the payment is successful, the order details are written to the database
					const response = await fetch("/api/payment", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							amount: postageCost,
							purchase_order_id: docRef.id ?? "order-failed",
							purchase_order_name: "Payment for delivery charges",
							customer_info: {
								name: currentUser.displayName,
								email: currentUser.email,
								phone:
									currentUser?.phoneNumber ??
									values.source.phoneNumber ??
									"9800000000",
							},
							amount_breakdown: [
								{
									label: "Order Sub Total",
									amount: postageCost,
								},
							],
							product_details: [
								{
									identity: docRef.id ?? "order-failed",
									name: "Package Order",
									total_price: postageCost,
									quantity: 1,
									unit_price: postageCost,
								},
							],
						}),
					});

					const { pidx, payment_url } = await response.json();
					// the order detail is updated with the payment details
					await setDoc(
						doc(db, "orders", docRef.id ?? "-"),
						{
							orderId: docRef.id,
							pidx,
							createdAt: serverTimestamp(),
						},
						{ merge: true }
					);

					// the payment details are added to the payments collection inside of the order collection in the database
					await setDoc(doc(db, "orders", docRef.id, "payments", pidx), {
						status: "PENDING",
						orderId: docRef.id,
						userId: currentUser.uid,
					});

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
							{/* Steps are used to navigate through the form one form at a time */}
							<Steps activeStep={activeStep}>
								<Step title="Where are you shipping from?">
									<StepContent>
										<Stack shouldWrapChildren spacing="4">
											<Text>
												For each ad campaign that you create, you can control
												how much you&apos;re willing to spend on clicks and
												conversions, which networks and geographical locations
												you want your ads to show on, and more.
											</Text>
											{/* Source form is called to enter details about the source location and sender details */}
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
												An ad group contains one or more ads which target a
												shared set of keywords.
											</Text>
											{/* Destination form is called to enter details about the destination location and reciever details */}
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
												features like ad extensions. If you run into any
												problems with your ads, find out how to tell if
												they&apos;re running and how to resolve approval issues.
											</Text>
											{/* What form is called to enter details about the package */}
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
												features like ad extensions. If you run into any
												problems with your ads, find out how to tell if
												they&apos;re running and how to resolve approval issues.
											</Text>
											{/* Sustinable form is called to enter details about the sustainability of the package */}
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
									colorScheme="brand"
									size="sm"
									fontSize="md"
									isLoading={props.isSubmitting}
								>
									Create Order
								</Button>
							</HStack>
						</Box>
						<FormObserver />
					</Form>
				)}
			</Formik>
		</>
	);
};

export default withProtected(CreateOrder);

const FormObserver = () => {
	const { values } = useFormikContext();
	const [value, setData] = useLocalStorage("order", defaultValues);

	useEffect(() => {
		setData(values as any);
	}, [setData, value, values]);

	return null;
};
