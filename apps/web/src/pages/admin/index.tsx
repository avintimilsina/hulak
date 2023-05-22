/* eslint-disable no-console */
import Search from "@/components/pages/admin/Search";
import withAdminProtected from "@/routes/withAdminProtected";
import { VStack } from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../../firebase";

const AdminPage = () => {
	const [currentUser, userLoading, userError] = useAuthState(auth);
	console.log("currentUser", currentUser?.displayName);
	const [, adminLoading, adminError] = useCollectionData(
		collection(db, "admins"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	if (userLoading || adminLoading) {
		return <div>Loading...</div>;
	}

	if (userError || adminError) {
		return <div>{userError ? userError.message : adminError?.message!}</div>;
	}

	return (
		<VStack>
			<h1>Admin Page</h1>
			<Search />
			{/* {admins?.map((admin) => (
				<div key={admin?.uid}>{admin?.displayName}</div>
			))} */}
		</VStack>
	);
};

export default withAdminProtected(AdminPage);
