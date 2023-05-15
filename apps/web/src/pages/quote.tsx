/* eslint-disable no-console */
import calculatePostage from "@/components/helpers/calculatePostage";
import WhatForm from "@/components/pages/create/WhatForm";
import InputField from "@/components/ui/InputField";
import { Button, HStack, Heading, Stack, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const defaultValues = {
	source: {
		city: "",
	},

	// Destination
	destination: {
		city: "",
	},
	package: {
		weight: 0,
		length: 0,
		width: 0,
		height: 0,
		value: 0,
	},
};
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
		value: Yup.number().required("Required"),
	}),
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
					values.package.height,
					values.package.weight,
					values.package.length,
					values.package.width,
					values.source.city,
					values.destination.city
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
							<HStack gap="4" w="full">
								<InputField name="destination.city" label="From" type="text" />

								<InputField name="source.city" label="To" type="text" />
							</HStack>
							<Heading size="md" w="full">
								Package Information
							</Heading>
							<WhatForm />
						</VStack>
						<VStack flexGrow={1}>
							<Text>Distance: {distance}m</Text>
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
