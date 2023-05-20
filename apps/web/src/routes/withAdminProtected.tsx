import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { useToast } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";

const withAdminProtected = (Component: any) =>
	function WithProtected(props: NextPageContext) {
		const [currentUser, userLoading, userError] = useAuthState(auth);
		const toast = useToast();
		const [value, loading, error] = useDocumentData(
			doc(db, "admins", currentUser?.uid ?? "-"),
			{
				snapshotListenOptions: { includeMetadataChanges: true },
			}
		);

		const router = useRouter();

		if (loading || userLoading) {
			return <PageLoadingSpinner />;
		}

		if (error || userError) {
			return <p>{error?.message}</p>;
		}

		if (!currentUser?.uid) {
			router.replace(
				{
					pathname: "/auth/login",
					query: {
						redirect: router.pathname,
					},
				},
				undefined,
				{
					shallow: true,
				}
			);
			return <PageLoadingSpinner />;
		}
		if (!value) {
			router.replace("/");
			if (!toast.isActive("admin")) {
				toast({
					title: "You are not an admin",
					status: "error",
					duration: 5000,
					isClosable: true,
					id: "admin",
				});
			}
		}

		return <Component {...props} />;
	};

export default withAdminProtected;
