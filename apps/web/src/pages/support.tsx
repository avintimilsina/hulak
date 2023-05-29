import Navbar from "@/components/ui/navbar";
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
	useToast,
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
	const toast = useToast();
	const [currentUser] = useAuthState(auth);
	return (
		<>
			<Navbar />
			<Formik
				initialValues={defaultValues}
				validationSchema={SupportPageSchema}
				onSubmit={async (values, actions) => {
					const docRef = await addDoc(collection(db, "support"), {
						...values,
						userId: currentUser?.uid ?? "guest",
						status: "INITIATED",
						createdAt: serverTimestamp(),
					});
					if (docRef.id) {
						toast({
							title: "Support request created.",
							status: "success",
							duration: 9000,
						});
					}
					actions.setSubmitting(false);
				}}
			>
				{(props: FormikProps<any>) => (
					<Form>
						<Container
							maxW="full"
							mt={0}
							centerContent
							overflow="hidden"
							h="100vh"
						>
							<Flex>
								<Box
									bg="brand.600"
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
													<Text mt={{ sm: 3, md: 3, lg: 5 }}>
														Fill up the form below to contact
													</Text>
													<Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
														<VStack pl={0} spacing={3} alignItems="flex-start">
															<Button
																size="md"
																height="48px"
																width="full"
																pl="0"
																variant="ghost"
																_hover={{ border: "2px solid " }}
																leftIcon={<MdPhone color="black" size="20px" />}
															>
																+977-988888888
															</Button>
															<Button
																size="md"
																height="48px"
																width="full"
																variant="ghost"
																_hover={{ border: "2px solid " }}
																leftIcon={<MdEmail color="black" size="20px" />}
															>
																support@hulak.com
															</Button>
															<Button
																size="md"
																height="48px"
																width="full"
																pl="0"
																variant="ghost"
																_hover={{ border: "2px solid" }}
																leftIcon={
																	<MdLocationOn color="black" size="20px" />
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
															_hover={{ bg: "black" }}
															icon={<MdFacebook size="28px" />}
														/>
														<IconButton
															aria-label="github"
															variant="ghost"
															size="lg"
															isRound
															_hover={{ bg: "black" }}
															icon={<BsGithub size="28px" />}
														/>
														<IconButton
															aria-label="discord"
															variant="ghost"
															size="lg"
															isRound
															_hover={{ bg: "black" }}
															icon={<BsDiscord size="28px" />}
														/>
													</HStack>
												</Box>
											</WrapItem>
											<WrapItem>
												<Box bg="white" borderRadius="lg" width="xl">
													<Box m={8} color="#0B0E3F">
														<VStack spacing={5}>
															<HStack w="full">
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
															<HStack w="full">
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
																		<Input
																			as={Textarea}
																			{...field}
																			type="text"
																		/>
																	</FormControl>
																)}
															</Field>

															<FormControl id="name" float="right">
																<Button
																	variant="solid"
																	colorScheme="brand"
																	type="submit"
																	isLoading={props.isSubmitting}
																	_hover={{ bg: "black" }}
																>
																	Open Issue
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
		</>
	);
};

export default SupportPage;
