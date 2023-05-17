import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const withAuthPages = (Component: any) =>
	function WithAuthPages(props: NextPageContext) {
		const [currentUser, loading, error] = useAuthState(auth);
		const router = useRouter();
		const { redirect } = router.query;

		if (loading) {
			return <PageLoadingSpinner />;
		}

		if (error) {
			return <p>{error.message}</p>;
		}

		if (currentUser?.uid) {
			if (redirect) {
				router.push(redirect as string);
			} else {
				router.push("/");
			}
			return <PageLoadingSpinner />;
		}

		return <Component {...props} />;
	};

export default withAuthPages;
