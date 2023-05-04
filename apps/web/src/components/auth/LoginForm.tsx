import { Link } from "@chakra-ui/next-js";
import {
	Button,
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import {
	useSignInWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../../firebase";

const LoginForm = () => {
	const [signInWithEmailAndPassword, , , error] =
		useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	const toast = useToast();

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={Yup.object({
				email: Yup.string().email("Invalid email address").required("Required"),
				password: Yup.string()
					.required("Required")
					.min(8, "At least 8 characters long")
					.max(30, "At most 30 characters long"),
			})}
			onSubmit={async (values, actions) => {
				const response = await signInWithEmailAndPassword(
					values.email,
					values.password
				);
				if (response) {
					if (!toast.isActive("login")) {
						toast({
							title: `Successfully logged in`,
							status: "success",
							isClosable: true,
							id: "login",
						});
					}
				} else if (!toast.isActive("login")) {
					toast({
						title: error?.message ?? "Invalid email or password",
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
					<VStack gap={2}>
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl
									isInvalid={form.errors.email && form.touched.email}
								>
									<FormLabel>Email</FormLabel>
									<Input {...field} type="email" placeholder="Email" />
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="password">
							{({ field, form }: any) => (
								<FormControl
									isInvalid={form.errors.password && form.touched.password}
								>
									<FormLabel>Password</FormLabel>
									<Input {...field} type="password" placeholder="Password" />
									<FormErrorMessage>{form.errors.password}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Stack spacing={10} width="full">
							<Stack
								direction={{ base: "column", sm: "row" }}
								align="start"
								justify="space-between"
							>
								<Checkbox>Remember me</Checkbox>
								<Link href="/auth/forgot-password" color="blue.400">
									Forgot password?
								</Link>
							</Stack>
							<Button isLoading={props.isSubmitting} type="submit">
								Sign in
							</Button>
							<Button
								onClick={async () => {
									await signInWithGoogle();
								}}
								leftIcon={<FcGoogle />}
							>
								Sign-in with Google
							</Button>
						</Stack>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
