import DestinationForm from "@/components/pages/create/DestinationForm";
import HowForm from "@/components/pages/create/HowForm";
import SourceForm from "@/components/pages/create/SourceForm";
import SustinableForm from "@/components/pages/create/SustinableForm";
import WhatForm from "@/components/pages/create/WhatForm";
import WhenForm from "@/components/pages/create/WhenForm";
import { Button } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";

const defaultValues = {
	name: "",
	type: "home",
	address: "",
	city: "",
	state: "",
	zip: "",
	country: "",
	phone_number: "",
};
const AddressFormSchema = Yup.object({
	name: Yup.string().required("Required"),
	type: Yup.string().required("Required").oneOf(["work", "home"]),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().required("Required"),
	zip: Yup.string().required("Required").min(4, "Too Short").max(6, "Too Long"),
	country: Yup.string().required("Required"),
	phone_number: Yup.string().matches(
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
		"Phone number is not valid"
	),
});
const CreateOrder = () => (
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
				<HowForm />
				<WhenForm />
				<SustinableForm />
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

export default CreateOrder;
