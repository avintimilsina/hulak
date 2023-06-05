import InputField from "@/components/ui/InputField";
import withAuthPages from "@/routes/withAuthPages";
import { Link } from "@chakra-ui/next-js";
import { Button, Grid, HStack, Text, VStack, useToast } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/router";
import {
	useCreateUserWithEmailAndPassword,
	useSendEmailVerification,
	useUpdateProfile,
} from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { ToggleButtonGroup, ToggleButton } from "@/components/ui/ToggleButton";
import { BsFillPersonFill } from "react-icons/bs";
import { MdBusiness } from "react-icons/md";
import { auth, db } from "../../../firebase";

// ? Register is a page where the user can register for a new account

// defaultValues indicates the default values of the input fields in the register form
const defaultValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	panNumber: "",
	isBusiness: false,
};

// RegisterSchema indicates the validation for the register form using Yup library
const RegisterSchema = Yup.object({
	firstName: Yup.string().required("Required"),
	isBusiness: Yup.boolean().required("Required"),
	lastName: Yup.string(),
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "At least 8 characters long")
		.max(30, "At most 30 characters long"),
	confirmPassword: Yup.string()
		.required("Please retype your password.")
		.oneOf([Yup.ref("password")], "Passwords must match"),
	panNumber: Yup.string().when("isBusiness", {
		is: true,
		then: (schema) => schema.required("Required"),
		otherwise: (schema) => schema.optional(),
	}),
});

const Register = () => {
	const router = useRouter();
	const toast = useToast();

	// createUserWithEmailAndPassword is a authentication hook from react-firebase-hooks/auth where it allows the user to create a new account with email and password
	const [createUserWithEmailAndPassword, , , error] =
		useCreateUserWithEmailAndPassword(auth);

	// updateProfile is a authentication hook from react-firebase-hooks/auth where it allows the user to update the user's profile
	const [updateProfile] = useUpdateProfile(auth);

	// sendEmailVerification is a authentication hook from react-firebase-hooks/auth where it allows it sends a email verification to the user's email
	const [sendEmailVerification] = useSendEmailVerification(auth);

	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={RegisterSchema}
			// onSubmit is a function that allows the user to create a new account with email and password
			onSubmit={async (values, actions) => {
				const response = await createUserWithEmailAndPassword(
					values.email,
					values.password
				);
				if (response) {
					// if the user is created successfully, update the user's profile with the user's first name, last name and photo URL
					// phpto URL is generated using DiceBear Avatars API
					const success = await updateProfile({
						displayName: `${values.firstName} ${values.lastName}`,
						photoURL: `https://api.dicebear.com/6.x/adventurer/svg?seed=${values.firstName} ${values.lastName}`,
					});

					// if the user's profile is created as a business, add additional information to the user's profile like PAN number along with the user's first name, last name and photo URL
					if (success) {
						if (values.isBusiness) {
							await setDoc(
								doc(db, "users", response?.user?.uid),
								{
									panNumber: values.panNumber,
									isBusiness: values.isBusiness,
								},
								{ merge: true }
							);
						}

						// send a email verification to the user's email
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
						<Field name="isBusiness">
							{/* ToggleButtonGroup is a component from Chakra UI where it allows the user to toggle between personal and business account */}
							{({ field, form }: FieldProps) => (
								<ToggleButtonGroup<"personal" | "business">
									{...field}
									onChange={(value) => {
										form.setFieldValue("isBusiness", value === "business");
									}}
									value={field.value ? "business" : "personal"}
									size="lg"
									defaultValue="personal"
									isAttached
									variant="outline"
									aria-label="Set Personal or Business"
								>
									<ToggleButton
										value="personal"
										aria-label="Personal"
										icon={<BsFillPersonFill />}
									/>
									<ToggleButton
										value="business"
										aria-label="Business"
										icon={<MdBusiness />}
									/>
								</ToggleButtonGroup>
							)}
						</Field>

						<VStack gap={2}>
							{/* If the user selects business account, display the company name and PAN number input fields */}
							{props.values.isBusiness ? (
								<HStack w="full">
									<InputField
										name="firstName"
										label="Company Name"
										type="text"
									/>
									<InputField name="panNumber" label="PAN Number" type="text" />
								</HStack>
							) : (
								// If the user selects personal account, display the first name and last name input fields
								<HStack w="full">
									<InputField name="firstName" label="First Name" type="text" />
									<InputField name="lastName" label="Last Name" type="text" />
								</HStack>
							)}
							<InputField name="email" label="Email" type="email" />
							<InputField name="password" label="Password" type="password" />
							<InputField
								name="confirmPassword"
								label="Confirm Password"
								type="password"
							/>

							<Button isLoading={props.isSubmitting} type="submit" w="lg">
								{props.values.isBusiness ? "Register as business" : "Sign up"}
							</Button>
							<Text align="center">
								Already a user?{" "}
								<Link href="/auth/login" color="blue.400">
									Login
								</Link>
							</Text>
						</VStack>
					</Grid>
				</Form>
			)}
		</Formik>
	);
};

export default withAuthPages(Register);
