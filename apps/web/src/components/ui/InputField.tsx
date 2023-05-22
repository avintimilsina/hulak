import {
	FormControl,
	HStack,
	FormLabel,
	FormErrorMessage,
	Input,
} from "@chakra-ui/react";
import { Field } from "formik";

interface InputFieldProps {
	label: string;
	name: string;
	type?: string;
	placeholder?: string;
}

const InputField = ({ label, name, type, placeholder }: InputFieldProps) => (
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
