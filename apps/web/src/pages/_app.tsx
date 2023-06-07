import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import SidebarWrapper from "@/components/shared/dashboard/sidebar";
import AdminSidebarWrapper from "@/components/shared/dashboard/sidebar/AdminSidebarWrapper";
import theme from "@/config/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { onIdTokenChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import nookies from "nookies";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
	const [currentUser, loading] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		const setUser = async () => {
			// When a new user is created, the user details are stored in the database under the users collection using setDoc hook from firebase
			// if the user already exists, the user details are updated
			if (currentUser) {
				await setDoc(
					doc(db, "users", currentUser?.uid),
					{
						email: currentUser?.email,
						photoURL: currentUser?.photoURL,
						displayName: currentUser?.displayName,
						uid: currentUser?.uid,
						phoneNumber: currentUser?.phoneNumber,
						providerData: currentUser?.providerData,
						emailVerified: currentUser?.emailVerified,
						username: currentUser?.email?.split("@")[0],
						createdAt: currentUser?.metadata?.creationTime,
					},
					{ merge: true }
				);
			}
		};

		setUser();
	}, [currentUser]);
	// This allows to render AdminSidebarWrapper component when the route starts with /admin as the admin and users have different dashboards

	useEffect(() => {
		const unsubscribe = onIdTokenChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken();
				nookies.set(undefined, "token", token, { path: "/" });
			} else {
				nookies.set(undefined, "token", "", { path: "/" });
			}
		});

		return unsubscribe;
	}, []);

	if (loading) {
		return <PageLoadingSpinner />;
	}

	if (router.pathname.startsWith("/admin")) {
		return (
			<ChakraProvider theme={theme}>
				<AdminSidebarWrapper>
					<Component {...pageProps} />
				</AdminSidebarWrapper>
			</ChakraProvider>
		);
	}
	// This allows to render SidebarWrapper component when the route starts with /account as the admin and users have different dashboards
	if (router.pathname.startsWith("/account")) {
		return (
			<ChakraProvider theme={theme}>
				<SidebarWrapper>
					<Component {...pageProps} />
				</SidebarWrapper>
			</ChakraProvider>
		);
	}

	return (
		// This is the default component that is rendered when the app is loaded
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	);
};
export default App;
