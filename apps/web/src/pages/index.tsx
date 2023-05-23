import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import { Button, Text, VStack } from "@chakra-ui/react";
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
		<VStack h="100vh" alignItems="flex-start">
			{currentUser ? (
				<Button w="3xs" my="4" onClick={signOut}>
					Sign Out
				</Button>
			) : (
				<Button
					w="3xs"
					my="4"
					onClick={() => {
						router.push("/auth/login");
					}}
				>
					Login
				</Button>
			)}
			<VStack gap="2" w="full" alignItems="flex-start">
				<Button
					onClick={() => {
						router.push("/auth/register");
					}}
				>
					Register
				</Button>
				<Button
					onClick={() => {
						router.push("/quote");
					}}
				>
					Quote
				</Button>
				<Button
					onClick={() => {
						router.push("/create-order");
					}}
				>
					Create Order
				</Button>
				<Button
					onClick={() => {
						router.push("/tracking");
					}}
				>
					Tracking
				</Button>
				<Button
					onClick={() => {
						router.push("/support");
					}}
				>
					Support
				</Button>
				<Button
					onClick={() => {
						router.push("/payment");
					}}
				>
					Payment
				</Button>
			</VStack>

			<Text as="pre" w="2xl">
				{JSON.stringify(currentUser, null, 2)}
			</Text>
		</VStack>
	);
};

export default Homepage;
