import AccountPreference from "@/components/pages/account/AccountPreference";
import withProtected from "@/routes/withProtected";
import { Heading, Stack } from "@chakra-ui/react";

const PreferencePage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<Heading fontSize="2xl">Account Preferences</Heading>
		<AccountPreference />
	</Stack>
);

export default withProtected(PreferencePage);
