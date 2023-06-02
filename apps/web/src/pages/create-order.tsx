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
import {
	Box,
	Button,
	Card,
	HStack,
	Heading,
	IconButton,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
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
import { useCallback, useEffect, useMemo, useState } from "react";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { OrderInfo } from "@/components/pages/admin/OrderLayout";
import { PriceTag } from "@/components/shared/PriceTag";
import { KHALTI_LOGO } from "@/config/brands";
import { AiOutlineClose } from "react-icons/ai";
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
	},

	// Sustinable
	description: "",
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
	}),
	description: Yup.string().required("Required"),
});

const allToFalse: any = (obj: any) =>
	Object.fromEntries(
		Object.entries(obj).map(([key, val]) => [
			key,
			Object(val) === val ? allToFalse(val) : Boolean(val),
		])
	);

const isItAllFalse: any = (object: any) =>
	Object.values(object).every((v) =>
		v && typeof v === "object" ? isItAllFalse(v) : v === false
	);

const CreateOrder = () => {
	const [data, setData] = useLocalStorage("order", defaultValues);

	const [currentUser] = useAuthState(auth);
	const router = useRouter();

	// steps from the useSteps hook is used to navigate through the steps in the form (from the ui/steps folder)
	const { nextStep, prevStep, activeStep } = useSteps({
		initialStep: 0,
	});

	const touchedFromStorage = useMemo(() => allToFalse(data), [data]);

	const [alertAcknowledged, setAlertAcknowledged] = useState(false);

	return (
		<>
			<Navbar />
			<Formik
				enableReinitialize
				initialValues={{ ...defaultValues, ...data }}
				initialTouched={{ ...touchedFromStorage }}
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
							{!isItAllFalse(touchedFromStorage) && !alertAcknowledged && (
								<HStack
									as={Card}
									p={2}
									mb={4}
									justifyContent="space-around"
									bgGradient="linear(to-r, teal.500, green.500)"
								>
									<Text fontWeight="semibold" color="white">
										A previous unsubmitted order was loaded. Do you want to
										start a fresh?
									</Text>
									<HStack>
										<Button
											type="button"
											variant="solid"
											onClick={() => {
												setData(defaultValues as any);
											}}
										>
											Start Fresh
										</Button>
										<IconButton
											variant="ghost"
											icon={<AiOutlineClose size="20" />}
											aria-label="Close Alert"
											onClick={() => {
												setAlertAcknowledged(true);
											}}
										/>
									</HStack>
								</HStack>
							)}

							{/* Steps are used to navigate through the form one form at a time */}
							<Steps activeStep={activeStep}>
								<Step title="Where are you shipping from?">
									<StepContent>
										<Stack shouldWrapChildren spacing="4">
											<Text>
												Please provide the following details about the sender.
												It&apos;s important to ensure that all the information
												provided is accurate and up to date. Double-check the
												details before submitting the form to avoid any
												potential issues with the pickup of your package.
											</Text>
											{/* Source form is called to enter details about the source location and sender details */}
											<SourceForm />
											<HStack>
												<Button size="sm" variant="ghost" isDisabled>
													Back
												</Button>
												<Button
													size="sm"
													onClick={async () => {
														setAlertAcknowledged(true);
														if (
															!props.errors.source &&
															Object.values(props.touched.source as any).every(
																Boolean
															)
														) {
															nextStep();
														} else {
															props.setFieldTouched("source.country", true);
															props.setFieldTouched("source.name", true);
															props.setFieldTouched("source.contactName", true);
															props.setFieldTouched(
																"source.addressLine1",
																true
															);
															props.setFieldTouched(
																"source.addressLine2",
																true
															);
															props.setFieldTouched("source.zip", true);
															props.setFieldTouched("source.city", true);
															props.setFieldTouched("source.state", true);
															props.setFieldTouched("source.email", true);
															props.setFieldTouched("source.phoneNumber", true);
														}
													}}
												>
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
												Please provide the following details about the reciever.
												Double-check the details before submitting the form to
												avoid any potential issues with the delivery of your
												package.
											</Text>
											{/* Destination form is called to enter details about the destination location and reciever details */}
											<DestinationForm />
											<HStack>
												<Button size="sm" onClick={prevStep} variant="ghost">
													Back
												</Button>
												<Button
													size="sm"
													onClick={async () => {
														if (
															!props.errors.destination &&
															Object.values(
																props.touched.destination as any
															).every(Boolean)
														) {
															nextStep();
														} else {
															props.setFieldTouched(
																"destination.country",
																true
															);
															props.setFieldTouched("destination.name", true);
															props.setFieldTouched(
																"destination.contactName",
																true
															);
															props.setFieldTouched(
																"destination.addressLine1",
																true
															);
															props.setFieldTouched(
																"destination.addressLine2",
																true
															);
															props.setFieldTouched("destination.zip", true);
															props.setFieldTouched("destination.city", true);
															props.setFieldTouched("destination.state", true);
															props.setFieldTouched("destination.email", true);
															props.setFieldTouched(
																"destination.phoneNumber",
																true
															);
														}
													}}
												>
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
												Please provide the following details about the package
												being sent. Note that the dimensions are in{" "}
												<strong>centimeters</strong>.
											</Text>
											{/* What form is called to enter details about the package */}
											<WhatForm />
											<HStack>
												<Button size="sm" onClick={prevStep} variant="ghost">
													Back
												</Button>
												<Button
													size="sm"
													onClick={async () => {
														if (
															!props.errors.package &&
															Object.values(props.touched.package as any).every(
																Boolean
															)
														) {
															nextStep();
														} else {
															props.setFieldTouched("package.length", true);
															props.setFieldTouched("package.width", true);
															props.setFieldTouched("package.height", true);
															props.setFieldTouched("package.weight", true);
															props.setFieldTouched("package.value", true);
														}
													}}
												>
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
												Help the environment by making your package carbon
												neutral. We&apos;ll plant a tree for every package you
												send.
											</Text>
											{/* Sustinable form is called to enter details about the sustainability of the package */}
											<SustinableForm />
											<HStack>
												<Button size="sm" onClick={prevStep} variant="ghost">
													Back
												</Button>
												<Button
													size="sm"
													onClick={async () => {
														if (
															!props.errors.description &&
															props.touched.description
														) {
															nextStep();
														} else {
															props.setFieldTouched("description", true);
														}
													}}
												>
													Proceed to Review
												</Button>
											</HStack>
										</Stack>
									</StepContent>
								</Step>
							</Steps>
							<OrderReview activeStep={activeStep} />
							<HStack
								display={activeStep === 4 ? "flex" : "none"}
								mt="10"
								spacing="4"
								shouldWrapChildren
								w="full"
								justifyContent="center"
							>
								<Button
									onClick={prevStep}
									variant="outline"
									size="lg"
									verticalAlign="baseline"
								>
									Back
								</Button>
								<Button
									type="submit"
									colorScheme="brand"
									size="lg"
									fontSize="md"
									isLoading={props.isSubmitting}
									rightIcon={<KHALTI_LOGO h="6" />}
								>
									Proceed with
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

interface OrderReviewProps {
	activeStep: number;
}

const OrderReview = ({ activeStep }: OrderReviewProps) => {
	const { values } = useFormikContext<typeof defaultValues>();
	const [total, setTotal] = useState(0);

	const packageCost = useCallback(async () => {
		if (
			values.package.height &&
			values.package.length &&
			values.package.weight &&
			values.package.width &&
			values.source.city &&
			values.destination.city
		) {
			const { postageCost } = await calculatePostage(
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
			setTotal(postageCost);
		} else {
			setTotal(0);
		}
	}, [
		values.destination.city,
		values.isDryIceIncluded,
		values.isLithiumIncluded,
		values.isOversizedPackageIncluded,
		values.isSignatureIncluded,
		values.package.height,
		values.package.length,
		values.package.weight,
		values.package.width,
		values.source.city,
	]);

	useEffect(() => {
		packageCost();
	}, [packageCost, values]);

	return (
		<VStack gap={4} my={8} display={activeStep === 4 ? "block" : "none"}>
			<Heading fontSize="lg" fontWeight="semibold">
				Review
			</Heading>
			<Stack
				direction={{ base: "column", md: "row" }}
				justifyContent="space-around"
				w="full"
				alignItems="flex-start"
			>
				{/* Displays the details of the source and destination of the order */}
				<OrderInfo label="Delivering From">
					<Text>
						{values?.source.addressLine1}, {values?.source.addressLine2}
					</Text>
					<Text>
						{values?.source.city},{values?.source.state}
					</Text>
					<Text>
						{values?.source.zip},{values?.source.country}
					</Text>
				</OrderInfo>
				<VStack alignItems="flex-start">
					<Text fontSize="lg" fontWeight="semibold">
						Delivering To
					</Text>
					<Text>
						{values?.destination.addressLine1},{" "}
						{values?.destination.addressLine2}
					</Text>
					<Text>
						{values?.destination.city},{values?.destination.state}
					</Text>
					<Text>
						{values?.destination.zip},{values?.destination.country}
					</Text>
				</VStack>
			</Stack>
			<HStack justify="space-between" w="full" fontWeight="bold" fontSize="lg">
				<Text>Order Total</Text>
				<PriceTag price={total} currency="NPR" />
			</HStack>
		</VStack>
	);
};
