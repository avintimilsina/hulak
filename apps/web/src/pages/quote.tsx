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
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
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
	const router = useRouter();
	const t = useTranslations("Quote");

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
												{t("shipping-title")}
											</Text>
											<Text color="gray.500">{t("shipping-description")}</Text>
										</VStack>
									</Box>
									<InputField
										name="source.city"
										label={t("shipping-from")}
										type="text"
									/>

									<InputField
										name="destination.city"
										label={t("shipping-to")}
										type="text"
									/>
									<InputField
										label={t("shipping-weight")}
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
												{t("dimension-title")}
											</Text>
											<Text color="gray.500">{t("dimension-description")}</Text>
										</VStack>
									</Box>
									<InputField
										label={t("dimension-length")}
										name="package.length"
										type="number"
									/>
									<InputField
										label={t("dimension-width")}
										name="package.width"
										type="number"
									/>
									<InputField
										label={t("dimension-height")}
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
												{t("options-title")}
											</Text>
											<Text color="gray.500">{t("options-description")}</Text>
										</VStack>
									</Box>
									<VStack gap="8" w="full">
										<SimpleGrid
											columns={2}
											spacing={4}
											display={{ base: "flex-row", lg: "grid" }}
										>
											<CheckboxField
												label={t("is-lithium-included")}
												name="isLithiumIncluded"
											/>
											<CheckboxField
												label={t("is-dry-ice-included")}
												name="isDryIceIncluded"
											/>
											<CheckboxField
												label={t("is-signature-included")}
												name="isSignatureIncluded"
											/>
											<CheckboxField
												label={t("is-oversized-package-included")}
												name="isOversizedPackageIncluded"
											/>
										</SimpleGrid>
										<Button type="submit" colorScheme="brand" w="full">
											{t("show-result")}
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
									<Heading size="md">{t("order-summary")}</Heading>

									<Stack spacing="6">
										<OrderSummaryBillItem label={t("distance")}>
											{distance.toFixed(2)} KM
										</OrderSummaryBillItem>
										<OrderSummaryBillItem label={t("package-volume")}>
											{volume} cc
										</OrderSummaryBillItem>
										<Flex justify="space-between">
											<Text fontSize="lg" fontWeight="semibold">
												{t("total")}
											</Text>
											<Text fontSize="xl" fontWeight="extrabold">
												{formatPrice(cost)}
											</Text>
										</Flex>
									</Stack>
									<Button
										colorScheme="brand"
										size="lg"
										fontSize="md"
										rightIcon={<FaArrowRight />}
										onClick={() => router.push("/create-order")}
										variant="outline"
									>
										{t("create-order")}
									</Button>
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
		<Flex justify="space-between">
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

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../messages/${ctx.locale}.json`)).default,
	},
});
