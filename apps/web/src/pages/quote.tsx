/* eslint-disable no-console */
import calculatePostage from "@/components/helpers/calculatePostage";
import WhatForm from "@/components/pages/create/WhatForm";
import SendFrom from "@/components/pages/quote/SendFrom";
import SendTo from "@/components/pages/quote/SendTo";
import { Button, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const defaultValues = {
	sourcePincode: "",
	sourceCity: "",
	sourceDistrict: "",
	destinationPincode: "",
	destinationCity: "",
	destinationDistrict: "",

	packageWeight: 0,
	packageLength: 0,
	packageWidth: 0,
	packageHeight: 0,
	packageValue: 0,
};
const QuoteFormSchema = Yup.object({
	sourcePincode: Yup.string().required("Required"),
	sourceCity: Yup.string().required("Required"),
	sourceDistrict: Yup.string().required("Required"),
	destinationPincode: Yup.string().required("Required"),
	destinationCity: Yup.string().required("Required"),
	destinationDistrict: Yup.string().required("Required"),

	packageWeight: Yup.number().required("Required"),
	packageLength: Yup.number().required("Required"),
	packageWidth: Yup.number().required("Required"),
	packageHeight: Yup.number().required("Required"),
	packageValue: Yup.number().required("Required"),
});
const QuotePage = () => {
	const [cost, setCost] = useState(0);
	const [distance, setDistance] = useState(0);
	const [volume, setVolume] = useState(0);

	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={QuoteFormSchema}
			onSubmit={async (values) => {
				const {
					postageCost,
					distance: calculatedDistance,
					volume: calculatedVolume,
				} = await calculatePostage(
					values.packageHeight,
					values.packageWeight,
					values.packageLength,
					values.packageWidth,
					values.sourceCity,
					values.destinationCity
				);
				setCost(postageCost);
				setDistance(calculatedDistance);
				setVolume(calculatedVolume);
			}}
		>
			{() => (
				<Form>
					<Heading textAlign="center">Quote</Heading>
					<Stack
						direction={["column", "column", "row"]}
						p="10"
						px={{ base: "6", md: "16" }}
						gap={8}
					>
						<VStack mx="auto" maxW="4xl" gap={4} px={{ base: 4, lg: 24 }}>
							<VStack gap="4">
								<SendFrom />
								<SendTo />
							</VStack>
							<Heading size="md" w="full">
								Package Information
							</Heading>
							<WhatForm />
						</VStack>
						<VStack flexGrow={1}>
							<Text>Distance: {distance}</Text>
							<Text>Postage Volume: {volume}</Text>
							<Text>Postage Cost: {cost}</Text>
							<Button type="submit">Submit</Button>
						</VStack>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

export default QuotePage;
