import WhatForm from "@/components/pages/create/WhatForm";
import SendFrom from "@/components/pages/quote/SendFrom";
import SendTo from "@/components/pages/quote/SendTo";
import { Box, Button, HStack, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const defaultValues = {
	packageWeight: undefined,
	packageLength: undefined,
	packageWidth: undefined,
	packageHeight: undefined,
	packageValue: undefined,
};
const QuoteFormSchema = Yup.object({
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
			console.log(values);
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
					<WhatForm />

					<Button type="submit">Submit</Button>
				</Box>
			</Form>
		)}
	</Formik>
);

export default QuotePage;
