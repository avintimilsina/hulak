import { HStack, VStack } from "@chakra-ui/react";
import InputField from "../ui/InputField";

const RegisterForm = () => (
	<VStack gap={2}>
		<HStack>
			<InputField name="firstName" label="First Name" type="text" />
			<InputField name="lastName" label="Last Name" type="text" />
		</HStack>
		<InputField name="email" label="Email" type="email" />
		<InputField name="password" label="Password" type="password" />
		<InputField
			name="confirmPassword"
			label="Confirm Password"
			type="password"
		/>
	</VStack>
);

export default RegisterForm;
