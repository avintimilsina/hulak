import {
	Button,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	Stack,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../../firebase";

// ? ForgotPasswordForm is a form where the user can reset their password

const ForgotPasswordForm = () => {
	// sendPasswordResetEmail is a authentication hook from react-firebase-hooks/auth where it allows the user to send a password reset email to the user's email
	const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);
	const toast = useToast();
	const router = useRouter();
	return (
		<Formik
			initialValues={{ email: "" }}
			validationSchema={Yup.object({
				email: Yup.string().email("Invalid email address").required("Required"),
			})}
			onSubmit={async (values, actions) => {
				// users can reset their password using the link in the email using firebase default password reset page
				// if the user successfully sent a password reset email, redirect the user to the login page and display a success toast message
				const success = await sendPasswordResetEmail(values.email);
				actions.setSubmitting(false);
				if (success) {
					router.push("/auth/login");
					if (!toast.isActive("login")) {
						toast({
							title: `Reset link sent to ${values.email}`,
							status: "success",
							isClosable: true,
							id: "login",
						});
					}
				}
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<VStack gap={2}>
						<Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
							Forgot your password?
						</Heading>
						<Text fontSize={{ base: "sm", sm: "md" }}>
							You&apos;ll get an email with a reset link.
						</Text>
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl
									isInvalid={form.errors.email && form.touched.email}
								>
									<Input
										{...field}
										type="email"
										placeholder="your-email@example.com"
										autoComplete="email"
									/>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Stack spacing={6} width="full">
							<Button
								type="submit"
								isLoading={props.isSubmitting}
								colorScheme="brand"
							>
								Send Reset Link
							</Button>
						</Stack>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default ForgotPasswordForm;
