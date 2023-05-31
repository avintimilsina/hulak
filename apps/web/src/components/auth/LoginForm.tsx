import { Link } from "@chakra-ui/next-js";
import { Checkbox, Stack, VStack } from "@chakra-ui/react";
import InputField from "../ui/InputField";

// ? LoginForm is a form to input the user's email and password to login to their account

const LoginForm = () => (
	<Stack spacing="4">
		<VStack gap={2}>
			<InputField label="Email" name="email" type="email" />
			<InputField label="Password" name="password" type="password" />

			<Stack spacing={10} width="full">
				<Stack
					direction={{ base: "column", sm: "row" }}
					align="start"
					justify="space-between"
				>
					<Checkbox>Remember me</Checkbox>
					<Link href="/auth/forgot-password" color="blue.400">
						Forgot password?
					</Link>
				</Stack>
			</Stack>
		</VStack>
	</Stack>
);

export default LoginForm;
