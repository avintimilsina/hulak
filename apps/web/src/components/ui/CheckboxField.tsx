import { Checkbox, FormControl } from "@chakra-ui/react";
import { Field } from "formik";

// ? CheckboxField is a component used to display the checkbox in the create-order page

interface CheckboxFieldProps {
	label: string;
	name: string;
}

const CheckboxField = ({ label, name }: CheckboxFieldProps) => (
	<Field name={name} type="checkbox">
		{({ field }: any) => (
			<FormControl>
				<Checkbox {...field}>{label}</Checkbox>
			</FormControl>
		)}
	</Field>
);

export default CheckboxField;
