import LoginForm from "@/components/auth/LoginForm";
import withAuthPages from "@/routes/withAuthPages";
import { Button, Grid, useToast } from "@chakra-ui/react";
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

const defaultValues = {
	email: "",
	password: "",
};

const LoginSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "At least 8 characters long")
		.max(30, "At most 30 characters long"),
});
const Login = () => {
	const [signInWithEmailAndPassword, , , loginError] =
		useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	const toast = useToast();
	const router = useRouter();
	const [currentUser, loading, error] = useAuthState(auth);

	if (loading) {
		return <p>Loading</p>;
	}
	if (error || loginError) {
		return <p>Error: {error?.message || loginError?.message}</p>;
	}
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
		<Formik
			initialValues={defaultValues}
			validationSchema={LoginSchema}
			onSubmit={async (values, actions) => {
				const response = await signInWithEmailAndPassword(
					values.email,
					values.password
				);
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
				} else if (!toast.isActive("login")) {
					toast({
						title: loginError ?? "Invalid email or password",
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
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default withAuthPages(Login);
