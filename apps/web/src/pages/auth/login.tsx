import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/logo";
import { fadeInRight } from "@/config/animations";
import { Link } from "@chakra-ui/next-js";
import {
	AbsoluteCenter,
	Box,
	Button,
	Image as ChakraImage,
	Divider,
	Flex,
	Heading,
	Stack,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { motion } from "framer-motion";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
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

// LoginSchema indicates the validation for the login form using Yup library
const LoginSchema = Yup.object({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.required("Required")
		.min(8, "At least 8 characters long")
		.max(30, "At most 30 characters long"),
});

const LoginPage = () => {
	const [signInWithEmailAndPassword, , , loginError] =
		useSignInWithEmailAndPassword(auth);
	const [animated, setAnimated] = useState(false);

	// signInWithGoogle is a authentication hook from react-firebase-hooks/auth where it allows the user to sign in with Google
	const [signInWithGoogle] = useSignInWithGoogle(auth);

	// useToast is a toast hook from Chakra UI where it allows the user to display a alert message for successful login or error message for unsuccessful login
	const toast = useToast();

	// useRouter is a router hook from Next.js where it allows the user to redirect to another page
	const router = useRouter();

	// useAuthState is a authentication hook from react-firebase-hooks/auth where it allows the user to check if the user is logged in or not

	// If the user is already logged in, redirect the user to the home page
	const MotionFlex = motion(Flex);
	const t = useTranslations("Login");
	return (
		<Stack minH="100vh" direction={{ base: "column", md: "row" }}>
			<MotionFlex
				p={8}
				flex={1}
				align="center"
				justify="center"
				initial="initial"
				animate="animate"
				variants={!animated && fadeInRight}
				onAnimationComplete={() => setAnimated(true)}
			>
				<Stack spacing={4} w="full" maxW="md">
					<Text align="left" my={10}>
						{t("return-to")}
						<Link href="/" color="blue.400">
							{t("home")}
						</Link>
					</Text>
					<VStack spacing={4} alignItems="center">
						<Logo />
						<Heading
							fontSize="xl"
							fontWeight="medium"
							textAlign="center"
							fontFamily="Inter"
							whiteSpace="nowrap"
							m={5}
						>
							{t("login-title")}
						</Heading>
					</VStack>
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
								<VStack gap={4} w="full" maxW="sm" mx="auto">
									<LoginForm />
									<Button
										isLoading={props.isSubmitting}
										type="submit"
										colorScheme="brand"
										mt={4}
										w="full"
									>
										{t("login-button")}
									</Button>
									<Box position="relative" w="full">
										<Divider colorScheme="brand" />
										<AbsoluteCenter bg="white" px="4" opacity="0.8">
											{t("or")}
										</AbsoluteCenter>
									</Box>
									{/* This button allows the user to sign in with Google Provider */}
									<Button
										w="full"
										variant="outline"
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
										{t("google-login-button")}
									</Button>
									<Stack pt={1}>
										<Text align="center">
											{t("dont-have-account")}

											<Link href="/auth/register" color="blue.400">
												{t("register")}
											</Link>
										</Text>
									</Stack>
								</VStack>
							</Form>
						)}
					</Formik>
				</Stack>
			</MotionFlex>
			<Flex
				flex={2}
				position="relative"
				display={{ base: "none", lg: "block" }}
			>
				<Flex
					color="white"
					zIndex={1}
					direction="column"
					w="full"
					alignItems="flex-end"
					justifyContent="flex-end"
				>
					<Heading
						p="20%"
						fontFamily="Dancing Script"
						fontWeight="semibold"
						fontSize="80px"
						whiteSpace="nowrap"
					>
						Welcome back,
					</Heading>
				</Flex>

				<ChakraImage
					as={Image}
					alt="Beautiful Foods"
					layout="fill"
					objectFit="cover"
					filter=" brightness(80%)"
					src="/assets/login-banner.webp"
					borderLeftRadius="3xl"
				/>
			</Flex>
		</Stack>
	);
};

export default LoginPage;

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
