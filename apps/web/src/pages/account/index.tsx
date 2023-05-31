import ServiceLink from "@/components/auth/ServiceLink";
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import FileUploadModal from "@/components/ui/FileUploadModal";
import withProtected from "@/routes/withProtected";
import type { StackProps } from "@chakra-ui/react";
import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	IconButton,
	Input,
	Stack,
	StackDivider,
	VStack,
} from "@chakra-ui/react";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Field, Form, Formik, FormikProps } from "formik";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { BiCurrentLocation } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import { auth, db } from "../../../firebase";

// ? AccountSetting is a page where the user can update their account settings

const AccountSetting = () => {
	// GoogleAuthProvider is a authentication hook from firebase/auth where it allows the user to link their google account to their account
	const googleProvider = new GoogleAuthProvider();
	const [currentUser, userLoading, userError] = useAuthState(auth);

	// useUpdateProfile is a authentication hook from react-firebase-hooks/auth where it allows the user to update their profile
	const [updateProfile, , updateError] = useUpdateProfile(auth);
	const router = useRouter();

	// useDocumentData is a firestore hook from react-firebase-hooks/firestore where it used to get the data from the firestore of the current logged in user
	const [value, loading, bioError] = useDocumentData(
		doc(db, "users", currentUser?.uid ?? "-"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	if (loading || userLoading) {
		return <PageLoadingSpinner />;
	}
	if (bioError || userError || updateError) {
		return (
			<Result
				heading="Account Error"
				text=""
				dump={userError?.message || updateError?.message}
				type="error"
			/>
		);
	}
	return (
		<Formik
			initialValues={{
				// here default values are set as the current user's name, email, and profile photo in the input fields
				name: currentUser?.displayName,
				email: currentUser?.email,
				profilePhoto: currentUser?.photoURL,
				location: value?.location ?? "",
			}}
			validationSchema={Yup.object({
				name: Yup.string().required("Required"),
				email: Yup.string().email("Invalid email address").required("Required"),
			})}
			onSubmit={async (values, actions) => {
				// it checks if the user has changed their name or location and only updates the user's profile if the user has changed their name or location
				if (values.name !== currentUser?.displayName) {
					const success = await updateProfile({ displayName: values.name });

					if (success) {
						router.push(`/${currentUser?.email?.split("@")[0]}`);
					}
				}

				// it allows the user to add their location to their profile
				if (values.location !== value?.location) {
					await setDoc(
						doc(db, "users", currentUser?.uid ?? ""),
						{
							location: values.location,
						},
						{ merge: true }
					);
				}

				actions.setSubmitting(false);
				actions.resetForm();
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Stack
						spacing="4"
						divider={<StackDivider />}
						maxWidth={{ base: "xs", md: "xl" }}
						marginLeft={6}
					>
						<Heading size="lg" as="h1" paddingBottom="4">
							Account Settings
						</Heading>
						<FieldGroup title="Personal Info">
							<VStack spacing="4" width="full">
								<Field name="name">
									{({ field, form }: any) => (
										<FormControl>
											<FormLabel>Name</FormLabel>
											<Input {...field} type="text" maxLength={255} />
											<FormErrorMessage>{form.errors.name}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
								<Field name="email">
									{({ field, form }: any) => (
										<FormControl>
											<FormLabel>Email</FormLabel>
											<Input
												isDisabled
												{...field}
												type="email"
												placeholder="your-email@example.com"
											/>
											<FormErrorMessage>{form.errors.email}</FormErrorMessage>
										</FormControl>
									)}
								</Field>
							</VStack>
						</FieldGroup>

						<FieldGroup title="Profile Photo">
							<VStack gap={4}>
								<Stack direction="row" spacing="6" align="center" width="full">
									{/* Avatar displays the user's profile photo */}
									<Avatar
										size="xl"
										name={currentUser?.displayName ?? "-"}
										src={currentUser?.photoURL!}
									/>
									<Box>
										{/* FileUploadModal is a component that allows the user to upload their profile photo */}
										<FileUploadModal
											onUpload={async (url) => {
												await updateProfile({ photoURL: url });
											}}
											imageRef={`images/profile/${
												currentUser?.uid ?? nanoid()
											}`}
										/>
									</Box>
								</Stack>
							</VStack>
						</FieldGroup>
						<FieldGroup title="Location">
							<VStack width="full" spacing="6" alignItems="flex-start">
								<HStack
									width="full"
									alignItems="flex-end"
									justifyContent="flex-start"
									maxW="xs"
								>
									<Field name="location">
										{({ field, form }: any) => (
											<FormControl>
												<FormLabel>Location</FormLabel>
												<Input {...field} type="text" maxLength={255} />
												<FormErrorMessage>
													{form.errors.location}
												</FormErrorMessage>
											</FormControl>
										)}
									</Field>

									{/* navigator.geolocation is a web api that allows the user to get their current location */}
									<IconButton
										aria-label="locate"
										icon={<BiCurrentLocation size="24" />}
										onClick={() => {
											if (navigator?.geolocation) {
												navigator.geolocation.getCurrentPosition(
													async (location) => {
														if (location)
															props.setFieldValue(
																"location",

																// getCityName is a function that allows the user to get their current city name
																await getCityName(
																	location.coords.latitude,
																	location.coords.longitude
																)
															);
													}
												);
											}
										}}
									/>
								</HStack>
							</VStack>
						</FieldGroup>

						<FieldGroup title="Connect accounts">
							<HStack width="full">
								{/* ServiceLink is a component that allows the user to link and unlink their google account or any other additional auth providers to their account */}
								<ServiceLink
									providerId="google.com"
									serviceProvider={googleProvider}
									serviceName="Google"
									serviceIcon={FcGoogle}
								/>
							</HStack>
						</FieldGroup>
					</Stack>
					<FieldGroup mt="8">
						<HStack width="full">
							<Button
								type="submit"
								colorScheme="brand"
								isLoading={props.isSubmitting}
								isDisabled={!props.dirty}
							>
								Save Changes
							</Button>
							<Button variant="outline">Cancel</Button>
						</HStack>
					</FieldGroup>
				</Form>
			)}
		</Formik>
	);
};
export default withProtected(AccountSetting);

// ? FieldGroup is a component that allows the user to group their input fields
interface FieldGroupProps extends StackProps {
	title?: string;
}
const FieldGroup = (props: FieldGroupProps) => {
	const { title, children, ...flexProps } = props;
	return (
		<Stack
			direction={{ base: "column", md: "row" }}
			spacing="6"
			py="4"
			{...flexProps}
		>
			<Box minW="3xs">
				{title && (
					<Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
						{title}
					</Heading>
				)}
			</Box>
			{children}
		</Stack>
	);
};
FieldGroup.defaultProps = {
	title: "",
};

// ? getCityName is a function that allows the user to get their current city name using api call from bigdatacloud
const getCityName = async (lat: number, lng: number) => {
	const res = await fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
	);
	const data = await res.json();
	return ` ${data.locality}`;
};
