import SidebarWrapper from "@/components/shared/dashboard/sidebar";
import theme from "@/config/theme";
import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import type { AppProps } from "next/app";
import { Router, useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
	const [currentUser] = useAuthState(auth);
	const router = useRouter();
	useEffect(() => {
		const setUser = async () => {
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

	return (
		<ChakraProvider theme={theme}>
			{router.pathname.startsWith("/account") ? (
				<SidebarWrapper>
					<Component {...pageProps} />
				</SidebarWrapper>
			) : (
				<Component {...pageProps} />
			)}
		</ChakraProvider>
	);
};
export default App;
