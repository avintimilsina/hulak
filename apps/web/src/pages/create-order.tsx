import DestinationForm from "@/components/pages/create/DestinationForm";
import SourceForm from "@/components/pages/create/SourceForm";
import SustinableForm from "@/components/pages/create/SustinableForm";
import WhatForm from "@/components/pages/create/WhatForm";
import { Button } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const defaultValues = {
	// Source
	sourceCountry: "",
	sourceName: "",
	sourceContactName: "",
	sourceAddressLine1: "",
	sourceAddressLine2: "",
	sourceZip: "",
	sourceCity: "",
	sourceState: "",
	sourceEmail: "",
	sourcePhoneNumber: "",

	// Destination
	destinationCountry: "",
	destinationName: "",
	destinationContactName: "",
	destinationAddressLine1: "",
	destinationAddressLine2: "",
	destinationZip: "",
	destinationCity: "",
	destinationState: "",
	destinationEmail: "",
	destinationPhoneNumber: "",

	// What
	packageWeight: "",
	packageLength: "",
	packageWidth: "",
	packageHeight: "",
	packageValue: "",

	// Sustinable
	packageDescription: "",
};
const AddressFormSchema = Yup.object({
	// Source
	sourceCountry: Yup.string().required("Required"),
	sourceName: Yup.string().required("Required"),
	sourceContactName: Yup.string().required("Required"),
	sourceAddressLine1: Yup.string().required("Required"),
	sourceAddressLine2: Yup.string().required("Required"),
	sourceZip: Yup.string().required("Required"),
	sourceCity: Yup.string().required("Required"),
	sourceState: Yup.string().required("Required"),
	sourceEmail: Yup.string().required("Required").email("Invalid email address"),
	sourcePhoneNumber: Yup.string()
		.required("Required")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		),

	// Destination
	destinationCountry: Yup.string().required("Required"),
	destinationName: Yup.string().required("Required"),
	destinationContactName: Yup.string().required("Required"),
	destinationAddressLine1: Yup.string().required("Required"),
	destinationAddressLine2: Yup.string().required("Required"),
	destinationZip: Yup.string().required("Required"),
	destinationCity: Yup.string().required("Required"),
	destinationState: Yup.string().required("Required"),
	destinationEmail: Yup.string()
		.required("Required")
		.email("Invalid email address"),
	destinationPhoneNumber: Yup.string()
		.required("Required")
		.matches(
			/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
			"Phone number is not valid"
		),

	// What
	packageWeight: Yup.string().required("Required"),
	packageLength: Yup.string().required("Required"),
	packageWidth: Yup.string().required("Required"),
	packageHeight: Yup.string().required("Required"),
	packageValue: Yup.string().required("Required"),

	// Sustinable
	packageDescription: Yup.string().required("Required"),
});
const CreateOrder = () => {
	const router = useRouter();
	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={AddressFormSchema}
			onSubmit={async (values, action) => {
				console.log(values);
				action.resetForm();
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<SourceForm />
					<DestinationForm />
					<WhatForm />
					<SustinableForm />
					<Button
						colorScheme="green"
						size="lg"
						fontSize="md"
						isLoading={props.isSubmitting}
						onClick={() => {
							router.push("/payment");
						}}
					>
						Payment
					</Button>
					<Button
						type="submit"
						colorScheme="blue"
						size="lg"
						fontSize="md"
						isLoading={props.isSubmitting}
					>
						Create Order
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default CreateOrder;
