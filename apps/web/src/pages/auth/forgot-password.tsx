import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import withAuthPages from "@/routes/withAuthPages";
import { Grid } from "@chakra-ui/react";

// ? ForgotPassword is a page where the user can reset their password

const ForgotPassword = () => (
	<Grid placeItems="center" h="100vh">
		<ForgotPasswordForm />
	</Grid>
);

export default withAuthPages(ForgotPassword);
