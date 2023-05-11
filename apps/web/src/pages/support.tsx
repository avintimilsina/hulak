import {
	Box,
	Button,
	Container,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	IconButton,
	Input,
	Text,
	Textarea,
	VStack,
	Wrap,
	WrapItem,
} from "@chakra-ui/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Field, Form, Formik, FormikProps } from "formik";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsDiscord, BsGithub } from "react-icons/bs";
import { MdEmail, MdFacebook, MdLocationOn, MdPhone } from "react-icons/md";
import * as Yup from "yup";
import { auth, db } from "../../firebase";

const SupportPageSchema = Yup.object({
	supportName: Yup.string().required("Required"),
	supportEmail: Yup.string()
		.required("Required")
		.email("Invalid email address"),
	issue: Yup.string().required("Required"),
	supportDescription: Yup.string().required("Required"),
});

const defaultValues = {
	supportName: "",
	supportEmail: "",
	issue: "",
	supportDescription: "",
	referenceNumber: "",
};

const SupportPage = () => {
	const [currentUser] = useAuthState(auth);
	return (
		<Formik
			initialValues={defaultValues}
			validationSchema={SupportPageSchema}
			onSubmit={async (values, actions) => {
				await addDoc(collection(db, "support"), {
					...values,
					userId: currentUser?.uid,
					status: "INITIATED",
					createdAt: serverTimestamp(),
				});
				actions.setSubmitting(false);
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Container
						bg="#9DC4FB"
						maxW="full"
						mt={0}
						centerContent
						overflow="hidden"
					>
						<Flex>
							<Box
								bg="#02054B"
								color="white"
								borderRadius="lg"
								m={{ sm: 4, md: 16, lg: 10 }}
								p={{ sm: 5, md: 5, lg: 16 }}
							>
								<Box p={4}>
									<Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
										<WrapItem>
											<Box>
												<Heading>Contact</Heading>
												<Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
													Fill up the form below to contact
												</Text>
												<Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
													<VStack pl={0} spacing={3} alignItems="flex-start">
														<Button
															size="md"
															height="48px"
															width="200px"
															variant="ghost"
															color="#DCE2FF"
															_hover={{ border: "2px solid #1C6FEB" }}
															leftIcon={<MdPhone color="#1970F1" size="20px" />}
														>
															+977-988888888
														</Button>
														<Button
															size="md"
															height="48px"
															width="200px"
															variant="ghost"
															color="#DCE2FF"
															_hover={{ border: "2px solid #1C6FEB" }}
															leftIcon={<MdEmail color="#1970F1" size="20px" />}
														>
															support@hulak.com
														</Button>
														<Button
															size="md"
															height="48px"
															width="200px"
															variant="ghost"
															color="#DCE2FF"
															_hover={{ border: "2px solid #1C6FEB" }}
															leftIcon={
																<MdLocationOn color="#1970F1" size="20px" />
															}
														>
															Kathmandu, Nepal
														</Button>
													</VStack>
												</Box>
												<HStack
													mt={{ lg: 10, md: 10 }}
													spacing={5}
													px={5}
													alignItems="flex-start"
												>
													<IconButton
														aria-label="facebook"
														variant="ghost"
														size="lg"
														isRound
														_hover={{ bg: "#0D74FF" }}
														icon={<MdFacebook size="28px" />}
													/>
													<IconButton
														aria-label="github"
														variant="ghost"
														size="lg"
														isRound
														_hover={{ bg: "#0D74FF" }}
														icon={<BsGithub size="28px" />}
													/>
													<IconButton
														aria-label="discord"
														variant="ghost"
														size="lg"
														isRound
														_hover={{ bg: "#0D74FF" }}
														icon={<BsDiscord size="28px" />}
													/>
												</HStack>
											</Box>
										</WrapItem>
										<WrapItem>
											<Box bg="white" borderRadius="lg" width="md">
												<Box m={8} color="#0B0E3F">
													<VStack spacing={5}>
														<HStack>
															<Field name="supportName">
																{({ field, form }: any) => (
																	<FormControl
																		isInvalid={
																			form.errors.supportName &&
																			form.touched.supportName
																		}
																	>
																		<HStack justifyContent="space-between">
																			<FormLabel>Name</FormLabel>
																			<FormErrorMessage>
																				{form.errors.supportName}
																			</FormErrorMessage>
																		</HStack>
																		<Input
																			{...field}
																			type="text"
																			maxLength={255}
																		/>
																	</FormControl>
																)}
															</Field>
															<Field name="supportEmail">
																{({ field, form }: any) => (
																	<FormControl
																		isInvalid={
																			form.errors.supportEmail &&
																			form.touched.supportEmail
																		}
																	>
																		<HStack justifyContent="space-between">
																			<FormLabel>Email</FormLabel>
																			<FormErrorMessage>
																				{form.errors.supportEmail}
																			</FormErrorMessage>
																		</HStack>
																		<Input
																			{...field}
																			type="email"
																			maxLength={255}
																		/>
																	</FormControl>
																)}
															</Field>
														</HStack>
														<HStack>
															<Field name="issue">
																{({ field, form }: any) => (
																	<FormControl
																		isInvalid={
																			form.errors.issue && form.touched.issue
																		}
																	>
																		<HStack justifyContent="space-between">
																			<FormLabel>Issue</FormLabel>
																			<FormErrorMessage>
																				{form.errors.issue}
																			</FormErrorMessage>
																		</HStack>
																		<Input
																			{...field}
																			type="text"
																			maxLength={255}
																		/>
																	</FormControl>
																)}
															</Field>
															<Field name="referenceNumber">
																{({ field }: any) => (
																	<FormControl>
																		<FormLabel>Reference Number</FormLabel>
																		<Input {...field} type="text" />
																	</FormControl>
																)}
															</Field>
														</HStack>
														<Field name="supportDescription">
															{({ field, form }: any) => (
																<FormControl
																	isInvalid={
																		form.errors.supportDescription &&
																		form.touched.supportDescription
																	}
																>
																	<HStack justifyContent="space-between">
																		<FormLabel>Description</FormLabel>
																		<FormErrorMessage>
																			{form.errors.supportDescription}
																		</FormErrorMessage>
																	</HStack>
																	<Input as={Textarea} {...field} type="text" />
																</FormControl>
															)}
														</Field>

														<FormControl id="name" float="right">
															<Button
																variant="solid"
																bg="#0D74FF"
																color="white"
																type="submit"
																isLoading={props.isSubmitting}
															>
																Send Message
															</Button>
														</FormControl>
													</VStack>
												</Box>
											</Box>
										</WrapItem>
									</Wrap>
								</Box>
							</Box>
						</Flex>
					</Container>
				</Form>
			)}
		</Formik>
	);
};

export default SupportPage;
