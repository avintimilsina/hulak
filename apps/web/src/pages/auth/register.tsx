import RegisterForm from "@/components/auth/RegisterForm";
import { Button, Grid, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import {
	useCreateUserWithEmailAndPassword,
	useSendEmailVerification,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth } from "../../../firebase";

const defaultValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
};

const RegisterSchema = Yup.object({
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
});

const Register = () => {
	const router = useRouter();
	const toast = useToast();
	const [createUserWithEmailAndPassword, , , error] =
		useCreateUserWithEmailAndPassword(auth);
	const [updateProfile] = useUpdateProfile(auth);
	const [sendEmailVerification] = useSendEmailVerification(auth);
	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={RegisterSchema}
			onSubmit={async (values, actions) => {
				const response = await createUserWithEmailAndPassword(
					values.email,
					values.password
				);
				if (response) {
					const success = await updateProfile({
						displayName: `${values.firstName} ${values.lastName}`,
						photoURL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${values.firstName} ${values.lastName}`,
					});
					if (success) {
						const emailVerification = await sendEmailVerification();
						if (emailVerification) {
							if (!toast.isActive("register")) {
								router.push("/auth/verify-email");
								toast({
									title: "Account created.",
									description:
										"We've sent you an email to verify your account.",
									status: "success",
									duration: 5000,
									isClosable: true,
									id: "register",
								});
							}
						}
					} else if (!toast.isActive("register")) {
						toast({
							title: "An error occurred.",
							description: error?.message,
							status: "error",
							duration: 5000,
							isClosable: true,
							id: "register",
						});
					}
					actions.setSubmitting(false);
				}
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Grid placeItems="center" h="100vh">
						<RegisterForm />
						<Button isLoading={props.isSubmitting} type="submit" w="lg">
							Sign up
						</Button>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default Register;
