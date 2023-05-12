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
}

const InputField = ({ label, name }: InputFieldProps) => (
	<Field name={name}>
		{({ field, meta }: any) => (
			<FormControl isInvalid={meta.error && meta.touched}>
				<HStack justifyContent="space-between">
					<FormLabel>{label}</FormLabel>
					<FormErrorMessage>{meta.error}</FormErrorMessage>
				</HStack>
				<Input {...field} type="text" maxLength={255} />
			</FormControl>
		)}
	</Field>
);

export default InputField;
