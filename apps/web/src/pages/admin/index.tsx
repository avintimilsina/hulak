/* eslint-disable no-console */
import Search from "@/components/pages/admin/Search";
import withAdminProtected from "@/routes/withAdminProtected";
import { VStack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const AdminPage = () => {
	const [currentUser, userLoading, userError] = useAuthState(auth);
	console.log("currentUser", currentUser?.displayName);

	if (userLoading) {
		return <div>Loading...</div>;
	}

	if (userError) {
		return <div>{userError.message}</div>;
	}

	return (
		<VStack>
			<h1>Admin Page</h1>
			<Search />
		</VStack>
	);
};

export default withAdminProtected(AdminPage);
