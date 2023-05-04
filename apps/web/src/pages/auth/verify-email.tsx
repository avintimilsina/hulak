import {
	Button,
	Center,
	Grid,
	Heading,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
	useAuthState,
	useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase";

const VerifyEmail = () => {
	const router = useRouter();
	const [currentUser, loading, error] = useAuthState(auth);
	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error: {error.message}</p>;
	}
	if (currentUser?.emailVerified) {
		router.push("/");
	}
	if (!currentUser) {
		router.push("/auth/register");
	}
	return (
		<div>
			<VerifyEmailPage currentUser={currentUser} />
		</div>
	);
};
interface VerifyEmailPageProps {
	currentUser: User | null | undefined;
}
const VerifyEmailPage = ({ currentUser }: VerifyEmailPageProps) => {
	const [sendEmailVerification] = useSendEmailVerification(auth);
	const toast = useToast();
	const router = useRouter();

	return (
		<Grid placeItems="center" h="100vh">
			<Stack>
				<Center>
					<Heading>Verify your Email</Heading>
				</Center>
				<Center>We have sent a verification email to you</Center>
				<Center>{currentUser?.email}</Center>

				<Button
					onClick={async () => {
						router.reload();
					}}
				>
					Already Verified?
				</Button>
				<Stack spacing={6}>
					<Stack>
						<Text align="center">
							Didn&apos;t receive a email?{" "}
							<Button
								variant="link"
								onClick={async () => {
									const emailVerification = await sendEmailVerification();
									if (emailVerification) {
										toast({
											title: `Email verification sent`,
											status: "success",
											isClosable: true,
											id: "email-verification",
										});
									}
								}}
							>
								Resend Email
							</Button>
						</Text>
					</Stack>
				</Stack>
			</Stack>
		</Grid>
	);
};

export default VerifyEmail;
