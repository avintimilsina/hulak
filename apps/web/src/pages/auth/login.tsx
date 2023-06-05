import LoginForm from "@/components/auth/LoginForm";
import withAuthPages from "@/routes/withAuthPages";
import { Link } from "@chakra-ui/next-js";
import { Button, Grid, Stack, Text, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import {
	useAuthState,
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { auth } from "../../../firebase";

// ? Login is a page where the user can login to their account

// defaultValues indicates the default values of the input fields in the login form
const defaultValues = {
	email: "",
	password: "",
};

// LoginSchema indicates the validation for the login form using Yup library
const LoginSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "At least 8 characters long")
		.max(30, "At most 30 characters long"),
});

const Login = () => {
	// signInWithEmailAndPassword is a authentication hook from react-firebase-hooks/auth where it allows the user to sign in with email and password
	const [signInWithEmailAndPassword, , , loginError] =
		useSignInWithEmailAndPassword(auth);

	// signInWithGoogle is a authentication hook from react-firebase-hooks/auth where it allows the user to sign in with Google
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	// useToast is a toast hook from Chakra UI where it allows the user to display a alert message for successful login or error message for unsuccessful login
	const toast = useToast();

	// useRouter is a router hook from Next.js where it allows the user to redirect to another page
	const router = useRouter();

	// useAuthState is a authentication hook from react-firebase-hooks/auth where it allows the user to check if the user is logged in or not
	const [currentUser, loading, error] = useAuthState(auth);

	if (loading) {
		return <p>Loading</p>;
	}
	if (error) {
		return <p>Error: {error?.message}</p>;
	}

	// If the user is already logged in, redirect the user to the home page
	if (currentUser) {
		if (!toast.isActive("login")) {
			router.push("/");
			toast({
				title: `You are already logged in`,
				status: "info",
				isClosable: true,
				id: "login",
			});
		}
	}
	return (
		// Formik is a form hook from Formik library where it allows the user to create a form with validation
		<Formik
			initialValues={defaultValues}
			validationSchema={LoginSchema}
			// onSubmit indicates the action to be taken when the user submits the form
			onSubmit={async (values, actions) => {
				// signInWithEmailAndPassword takes the email and password from the user and sign the user in
				const response = await signInWithEmailAndPassword(
					values.email,
					values.password
				);

				// If the user is successfully logged in, redirect the user to the home page and display a success toast
				if (response) {
					//  Check if the toast is already active to prevent duplicate toasts
					if (!toast.isActive("login")) {
						router.push("/");
						toast({
							title: `Successfully logged in`,
							status: "success",
							isClosable: true,
							id: "login",
						});
					}

					// If the user is not successfully logged in, display a error toast
				} else if (!toast.isActive("login")) {
					toast({
						title: loginError?.message ?? "Invalid email or password",
						status: "error",
						isClosable: true,
						id: "login",
					});
				}
				actions.setSubmitting(false);
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Grid gap={4} placeContent="center" h="100vh">
						<LoginForm />
						<Button
							isLoading={props.isSubmitting}
							type="submit"
							colorScheme="blue"
							mt={4}
						>
							Sign in
						</Button>

						{/* This button allows the user to sign in with Google Provider */}
						<Button
							onClick={async () => {
								const response = await signInWithGoogle();
								if (response) {
									if (!toast.isActive("login")) {
										router.push("/");
										toast({
											title: `Successfully logged in`,
											status: "success",
											isClosable: true,
											id: "login",
										});
									}
								}
							}}
							leftIcon={<FcGoogle />}
						>
							Sign-in with Google
						</Button>
						<Stack pt={1}>
							<Text align="center">
								Don&apos;t have an account?{" "}
								<Link href="/auth/register" color="blue.400">
									Register
								</Link>
							</Text>
						</Stack>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default withAuthPages(Login);
