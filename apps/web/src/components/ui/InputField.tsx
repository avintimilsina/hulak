import {
	FormControl,
	HStack,
	FormLabel,
	FormErrorMessage,
	Input,
	InputProps,
} from "@chakra-ui/react";
import { Field } from "formik";

// ? InputField is the component that is used to display the input fields for the forms in the app.
// It takes arguments such as label, name, type, and placeholder which is required for the Formik Library to validate and show errors.

interface InputFieldProps extends InputProps {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
}

const InputField = ({
	label,
	name,
	type,
	placeholder,
	...rest
}: InputFieldProps) => (
	<Field name={name}>
		{({ field, meta }: any) => (
			<FormControl isInvalid={meta.error && meta.touched}>
				<HStack justifyContent="space-between">
					<FormLabel>{label}</FormLabel>
					<FormErrorMessage>{meta.error}</FormErrorMessage>
				</HStack>
				<Input
					{...field}
					type={type}
					maxLength={255}
					placeholder={placeholder}
					{...rest}
				/>
			</FormControl>
		)}
	</Field>
);

InputField.defaultProps = {
	type: "text",
	placeholder: "",
};

export default InputField;
