import AccountPreference from "@/components/pages/account/AccountPreference";
import DangerZone from "@/components/pages/account/DangerZone";
import withProtected from "@/routes/withProtected";
import { Heading, Stack } from "@chakra-ui/react";

// ? PreferencePage is a page where the user can change their account preferences

const PreferencePage = () => (
	<Stack as="section" spacing="6" maxW="3xl" my={8}>
		<Heading fontSize="2xl">Account Preferences</Heading>
		<AccountPreference />
		<DangerZone />
	</Stack>
);

export default withProtected(PreferencePage);
