import Result from "@/components/shared/Result";
import withProtected from "@/routes/withProtected";
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

// ? VerifyEmail is a page where the user can verify their email with firebase authentication

const VerifyEmail = () => {
	const router = useRouter();
	const [currentUser, loading, error] = useAuthState(auth);
	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <Result type="error" heading={error.name} text={error.message} />;
	}

	//  if the user is already verified, redirect the user to the home page
	if (currentUser?.emailVerified) {
		router.push("/");
	}

	// if the user is not logged in, redirect the user to the login page
	if (!currentUser) {
		router.push("/auth/register");
	}
	return (
		<div>
			<VerifyEmailPage currentUser={currentUser} />
		</div>
	);
};

// ? Interface allows the user to pass destructured props to a component
// here we are passing the currentUser prop to the VerifyEmailPage component
interface VerifyEmailPageProps {
	currentUser: User | null | undefined;
}

// while passing a destructured prop to a component, we need to enclose it in curly braces
const VerifyEmailPage = ({ currentUser }: VerifyEmailPageProps) => {
	// sendEmailVerification is a authentication hook from react-firebase-hooks/auth where it allows the user to send a email verification to the provided user's email
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

				{/* this button checks whether the user is verified or not when it reloads the page and above if(currentUser.emailVerified) is called */}
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
							{/* this button allows the user to resend a email verification to the user's email */}
							<Button
								variant="link"
								onClick={async () => {
									const emailVerification = await sendEmailVerification();
									if (emailVerification) {
										if (!toast.isActive("email-verification")) {
											toast({
												title: `Email verification sent`,
												status: "success",
												isClosable: true,
												id: "email-verification",
											});
										}
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

export default withProtected(VerifyEmail);
