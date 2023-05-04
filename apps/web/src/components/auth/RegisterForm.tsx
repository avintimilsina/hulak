import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import {
	useCreateUserWithEmailAndPassword,
	useSendEmailVerification,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../../firebase";

const RegisterForm = () => {
	const router = useRouter();
	const toast = useToast();
	const [createUserWithEmailAndPassword, , , error] =
		useCreateUserWithEmailAndPassword(auth);
	const [updateProfile] = useUpdateProfile(auth);
	const [sendEmailVerification] = useSendEmailVerification(auth);

	return (
		<Formik
			initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
			validationSchema={Yup.object({
				firstName: Yup.string().required("Required"),
				lastName: Yup.string().required("Required"),
				email: Yup.string().email("Invalid email address").required("Required"),
				password: Yup.string()
					.required("Required")
					.min(8, "At least 8 characters long")
					.max(30, "At most 30 characters long"),
				confirmPassword: Yup.string()
					.required("Please retype your password.")
					.oneOf([Yup.ref("password")], "Passwords must match"),
			})}
			onSubmit={async (values, actions) => {
				// createUserWithEmailAndPassword hook from react-firebase-hooks/auth
				const response = await createUserWithEmailAndPassword(
					values.email,
					values.password
				);
				if (response) {
					// updating the user profile displayName using updateProfile hook from react-firebase-hooks/auth
					const success = await updateProfile({
						displayName: `${values.firstName} ${values.lastName}`,
						photoURL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${values.firstName} ${values.lastName}`,
					});
					if (success) {
						const emailVerification = await sendEmailVerification();
						if (emailVerification) {
							toast({
								title: `Registered successfully`,
								status: "success",
								isClosable: true,
								id: "register",
							});
						}
						router.push("/auth/verify-email");
					}
				} else if (error) {
					if (!toast.isActive("register")) {
						toast({
							title: error.message,
							status: "error",
							isClosable: true,
							id: "register",
						});
					}
				}
				actions.setSubmitting(false);
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<VStack gap={2}>
						<HStack>
							<Field name="firstName">
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.firstName && form.touched.firstName}
									>
										<FormLabel>First Name</FormLabel>
										<Input {...field} type="text" placeholder="First Name" />
										<FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
							<Field name="lastName">
								{({ field, form }: any) => (
									<FormControl
										isInvalid={form.errors.lastName && form.touched.lastName}
									>
										<FormLabel>Last Name</FormLabel>
										<Input {...field} type="text" placeholder="Last Name" />
										<FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
									</FormControl>
								)}
							</Field>
						</HStack>
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
						<Field name="confirmPassword">
							{({ field, form }: any) => (
								<FormControl
									isInvalid={
										form.errors.confirmPassword && form.touched.confirmPassword
									}
								>
									<FormLabel>Confirm Password</FormLabel>
									<Input
										{...field}
										type="password"
										placeholder="Retype Your Password"
									/>
									<FormErrorMessage>
										{form.errors.confirmPassword}
									</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Stack spacing={10} width="full">
							<Button isLoading={props.isSubmitting} type="submit">
								Sign up
							</Button>
						</Stack>
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
