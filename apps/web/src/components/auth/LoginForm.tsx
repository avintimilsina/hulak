import { Link } from "@chakra-ui/next-js";
import { Checkbox, Stack, VStack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import InputField from "../ui/InputField";

// ? LoginForm is a form to input the user's email and password to login to their account

const LoginForm = () => {
	const t = useTranslations("Login");
	return (
		<Stack spacing="4" w="full">
			<VStack gap={2}>
				<InputField
					label={t("email")}
					name="email"
					type="email"
					placeholder={t("email-placeholder")}
					autoComplete="email"
				/>
				<InputField
					label={t("password")}
					name="password"
					type="password"
					placeholder={t("password-placeholder")}
					autoComplete="current-password"
				/>

				<Stack spacing={10} width="full">
					<Stack
						direction={{ base: "column", sm: "row" }}
						align="start"
						justify="space-between"
					>
						<Checkbox>{t("remember-me")}</Checkbox>
						<Link href="/auth/forgot-password" color="blue.400">
							{t("forgot-password")}
						</Link>
					</Stack>
				</Stack>
			</VStack>
		</Stack>
	);
};

export default LoginForm;
