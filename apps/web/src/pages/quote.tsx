/* eslint-disable no-console */
import calculatePostage from "@/components/helpers/calculatePostage";
import { formatPrice } from "@/components/shared/PriceTag";
import CheckboxField from "@/components/ui/CheckboxField";
import InputField from "@/components/ui/InputField";
import Navbar from "@/components/ui/navbar";
import {
	Box,
	Button,
	Flex,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

// ? Quote Page allows the user to enter the source and destination of the package and calculate the postage cost according to the package information

// defaultValues is setup for the formik form
const defaultValues = {
	source: {
		city: "",
	},

	// Destination
	destination: {
		city: "",
	},
	package: {
		weight: undefined,
		length: undefined,
		width: undefined,
		height: undefined,
		value: undefined,
	},
	isLithiumIncluded: false,
	isDryIceIncluded: false,
	isSignatureIncluded: false,
	isOversizedPackageIncluded: false,
};

// QuoteFormSchema is the validation schema for the form
const QuoteFormSchema = Yup.object({
	source: Yup.object({
		city: Yup.string().required("Required"),
	}),
	destination: Yup.object({
		city: Yup.string().required("Required"),
	}),
	package: Yup.object({
		weight: Yup.number().required("Required"),
		length: Yup.number().required("Required"),
		width: Yup.number().required("Required"),
		height: Yup.number().required("Required"),
	}),
});
const QuotePage = () => {
	const [cost, setCost] = useState(0);
	const [distance, setDistance] = useState(0);
	const [volume, setVolume] = useState(0);

	return (
		<>
			<Navbar />
			<Formik
				initialValues={defaultValues}
				validationSchema={QuoteFormSchema}
				onSubmit={async (values) => {
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
					setCost(postageCost);
					setDistance(calculatedDistance);
					setVolume(calculatedVolume);
				}}
			>
				{() => (
					<Form>
						<Stack
							direction={["column", "column", "row"]}
							p="10"
							px={{ base: "6", md: "16" }}
							gap={4}
						>
							<VStack maxW="4xl" gap={8} pl={{ base: 4, lg: 24 }}>
								<Stack
									gap="4"
									w="full"
									direction={{ base: "column", lg: "row" }}
								>
									<Box w={{ base: "none", lg: "7xl" }}>
										<VStack alignItems="flex-start">
											<Text fontSize="xl" fontWeight="semibold">
												Shipping Information
											</Text>
											<Text color="gray.500">
												Enter the source and destination
											</Text>
										</VStack>
									</Box>
									<InputField
										name="destination.city"
										label="From"
										type="text"
									/>

									<InputField name="source.city" label="To" type="text" />
									<InputField
										label="Weight"
										name="package.weight"
										type="number"
									/>
								</Stack>

								<Stack
									gap="4"
									w="full"
									direction={{ base: "column", lg: "row" }}
								>
									<Box w={{ base: "none", lg: "7xl" }}>
										<VStack alignItems="flex-start">
											<Text fontSize="xl" fontWeight="semibold">
												Dimension
											</Text>
											<Text color="gray.500">
												Enter package dimensions in cm
											</Text>
										</VStack>
									</Box>
									<InputField
										label="Length"
										name="package.length"
										type="number"
									/>
									<InputField
										label="Width"
										name="package.width"
										type="number"
									/>
									<InputField
										label="Height"
										name="package.height"
										type="number"
									/>
								</Stack>
								<Stack
									gap="4"
									w="full"
									alignItems="flex-start"
									mr="0"
									direction={{ base: "column", lg: "row" }}
								>
									<Box w={{ base: "none", lg: "sm" }}>
										<VStack alignItems="flex-start">
											<Text fontSize="xl" fontWeight="semibold">
												Options
											</Text>
											<Text color="gray.500">Select options as required</Text>
										</VStack>
									</Box>
									<VStack gap="8" w="full">
										<SimpleGrid
											columns={2}
											spacing={4}
											display={{ base: "flex-row", lg: "grid" }}
										>
											<CheckboxField
												label="Include Lithium Batteries (+$)"
												name="isLithiumIncluded"
											/>
											<CheckboxField
												label="Include Dry Ice (+$)"
												name="isDryIceIncluded"
											/>
											<CheckboxField
												label="Signature Options (+$)"
												name="isSignatureIncluded"
											/>
											<CheckboxField
												label="Oversized Package (+$)"
												name="isOversizedPackageIncluded"
											/>
										</SimpleGrid>
										<Button type="submit" colorScheme="brand" w="full">
											Show Result
										</Button>
									</VStack>
								</Stack>
							</VStack>
							{/* <VStack flexGrow={1} maxW="sm">
								<HStack justifyContent="space-between" w="full">
									<Text>Distance:</Text>
									<Text>{distance.toFixed(2)} KM</Text>
								</HStack>
								<HStack justifyContent="space-between" w="full">
									<Text>Volume:</Text>
									<Text>{volume} cc</Text>
								</HStack>
								<HStack justifyContent="space-between" w="full">
									<Text>Price:</Text>
									<PriceTag price={cost} currency="NPR" />
								</HStack>
								
							</VStack> */}
							<Box w="full">
								<Stack
									spacing="8"
									borderWidth="1px"
									rounded="lg"
									padding="8"
									width="full"
								>
									<Heading size="md">Order Summary</Heading>

									<Stack spacing="6">
										<OrderSummaryBillItem label="Distance">
											{distance.toFixed(2)} KM
										</OrderSummaryBillItem>
										<OrderSummaryBillItem label="Pacakge Volume">
											{volume} cc
										</OrderSummaryBillItem>
										<Flex justify="space-between">
											<Text fontSize="lg" fontWeight="semibold">
												Total
											</Text>
											<Text fontSize="xl" fontWeight="extrabold">
												{formatPrice(cost)}
											</Text>
										</Flex>
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default QuotePage;

type OrderSummaryBillItemProps = {
	label: string;
	value?: string;
	children?: React.ReactNode;
};

export const OrderSummaryBillItem = (props: OrderSummaryBillItemProps) => {
	const { label, value, children } = props;
	return (
		<Flex justify="space-between" fontSize="sm">
			<Text
				fontWeight="medium"
				color={useColorModeValue("gray.600", "gray.400")}
			>
				{label}
			</Text>
			{value ? <Text fontWeight="medium">{value}</Text> : children}
		</Flex>
	);
};

OrderSummaryBillItem.defaultProps = {
	value: undefined,
	children: undefined,
};
