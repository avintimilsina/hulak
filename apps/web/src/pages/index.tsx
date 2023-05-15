import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import { Button, Grid, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const Homepage = () => {
	const [signOut, loading, error] = useSignOut(auth);
	const [currentUser, userLoading, userError] = useAuthState(auth);
	const router = useRouter();
	if (loading || userLoading) {
		return <PageLoadingSpinner />;
	}
	if (error || userError) {
		return (
			<Result
				heading="SignOut Error"
				text=""
				dump={error?.message || userError?.message}
				type="error"
			/>
		);
	}

	return (
		<Grid placeItems="left" h="100vh">
			{currentUser ? (
				<Button onClick={signOut}>Sign Out</Button>
			) : (
				<Button
					onClick={() => {
						router.push("/auth/login");
					}}
				>
					Login
				</Button>
			)}
			<Text as="pre" w="2xl">
				{JSON.stringify(currentUser, null, 2)}
			</Text>
		</Grid>
	);
};

export default Homepage;
