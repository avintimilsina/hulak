import {
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../../firebase";

const ForgotPasswordForm = () => {
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
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl
									isInvalid={form.errors.email && form.touched.email}
								>
									<Input
										{...field}
										type="email"
										placeholder="your-email@example.com"
									/>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Stack spacing={6} width="full">
							<Button type="submit" isLoading={props.isSubmitting}>
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
