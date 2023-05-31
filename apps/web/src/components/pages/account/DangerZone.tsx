import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import type { StackProps } from "@chakra-ui/react";
import { Card, Heading, Stack, Text } from "@chakra-ui/react";
import { deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../../../../firebase";

// ? DangerZone is a component where the user can delete their account and data from the website
const DangerZone = (props: StackProps) => {
	const [curretUser, userLoading, userError] = useAuthState(auth);
	// useSignOut is a function from react-firebase-hooks/auth that signs out the user from the application
	const [signOut, loading, error] = useSignOut(auth);

	const router = useRouter();

	if (loading || userLoading) return <PageLoadingSpinner />;

	if (error || userError) {
		return (
			<Result
				heading={error ? error.name : userError?.name!}
				type="error"
				text={error ? error.message : userError?.message!}
				dump={error ? error.stack : userError?.stack!}
			/>
		);
	}

	return (
		<Stack as="section" spacing="6" {...props}>
			<Heading fontSize="2xl" mb="0">
				Danger zone
			</Heading>
			<Card p="4">
				<Text fontWeight="bold">Delete account and data</Text>
				<Text fontSize="sm" mt="1" mb="3">
					Once you delete your user, there is no going back. Please be certain.
				</Text>
				{/* this checks if the user want to delete their account and data with a confirmation text. If the user confirms then the account and data will be deleted from the data base and the user will be signed out and redirected to the home page. */}
				<ConfirmationModal
					onSuccess={async () => {
						// deleteDoc is a function from firebase/firestore that deletes a document from the database
						await deleteDoc(doc(db, "users", curretUser?.uid ?? "-"));
						signOut();
						await router.push("/");
					}}
					headerText="Delete Account"
					bodyText="Are you sure you want to delete your account?"
					colorScheme="red"
					confirmText={
						curretUser?.displayName
							? `Delete ${curretUser?.displayName}`
							: "Delete Account"
					}
				>
					{" "}
					Delete Account
				</ConfirmationModal>
			</Card>
		</Stack>
	);
};

export default DangerZone;
