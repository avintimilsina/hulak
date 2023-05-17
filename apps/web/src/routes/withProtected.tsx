import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const withProtected = (Component: any) =>
	function WithProtected(props: NextPageContext) {
		const [currentUser, loading, error] = useAuthState(auth);

		const router = useRouter();

		if (loading) {
			return <PageLoadingSpinner />;
		}

		if (error) {
			return <p>{error.message}</p>;
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

		return <Component {...props} />;
	};

export default withProtected;
