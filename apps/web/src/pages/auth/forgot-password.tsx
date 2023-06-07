import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import Logo from "@/components/logo";
import withAuthPages from "@/routes/withAuthPages";
import { Grid, VStack } from "@chakra-ui/react";

// ? ForgotPassword is a page where the user can reset their password

const ForgotPassword = () => (
	<Grid placeItems="center" h="100vh">
		<VStack spacing={8} mb={8}>
			<Logo />
			<ForgotPasswordForm />
		</VStack>
	</Grid>
);

export default withAuthPages(ForgotPassword);
