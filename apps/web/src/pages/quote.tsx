/* eslint-disable no-console */
import calculatePostage from "@/components/helpers/calculatePostage";
import WhatForm from "@/components/pages/create/WhatForm";
import SendFrom from "@/components/pages/quote/SendFrom";
import SendTo from "@/components/pages/quote/SendTo";
import { Box, Button, Card, CardBody, HStack, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
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
const QuotePage = () => (
	<Formik
		initialValues={defaultValues}
		validationSchema={QuoteFormSchema}
		onSubmit={async (values) => {
			const postagePrice = await calculatePostage(
				values.packageHeight,
				values.packageWeight,
				values.packageLength,
				values.packageWidth,
				values.sourceCity,
				values.destinationCity
			);
			console.log("PostagePrice", postagePrice);
		}}
	>
		{() => (
			<Form>
				<Box
					mx="auto"
					maxW="4xl"
					py="10"
					px={{ base: "6", md: "8" }}
					minH="400px"
				>
					<Heading>Quote</Heading>
					<HStack justifyContent="space-between">
						<SendFrom />
						<SendTo />
					</HStack>
					<Card
						p="4"
						borderRadius="md"
						borderWidth="1px"
						boxShadow="md"
						borderColor="gray.200"
					>
						<CardBody>
							<WhatForm />
						</CardBody>
					</Card>

					<Button type="submit">Submit</Button>
				</Box>
			</Form>
		)}
	</Formik>
);

export default QuotePage;
