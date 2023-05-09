import {
	Button,
	Card,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore";
import { Field, Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import * as Yup from "yup";
import { auth, db } from "../../../../../firebase";

export type AddressFormValues = {
	name: string;
	type: string;
	address: string;
	city: string;
	state: string;
	zip: string;
	country: string;
	phone_number: string;
};

const AddressFormSchema = Yup.object({
	name: Yup.string().required("Required"),
	type: Yup.string().required("Required").oneOf(["work", "home"]),
	address: Yup.string().required("Required"),
	city: Yup.string().required("Required"),
	state: Yup.string().required("Required"),
	zip: Yup.string().required("Required").min(4, "Too Short").max(6, "Too Long"),
	country: Yup.string().required("Required"),
	phone_number: Yup.string().matches(
		/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
		"Phone number is not valid"
	),
});

const emptyAddressFormValues: AddressFormValues = {
	name: "",
	type: "home",
	address: "",
	city: "",
	state: "",
	zip: "",
	country: "",
	phone_number: "",
};

interface AddressFormProps {
	id?: string;
	defaultValues?: AddressFormValues;
	onSubmissionSuccess?: () => void;
}

const AddressForm = ({
	id,
	defaultValues,
	onSubmissionSuccess: closeModal,
}: AddressFormProps) => {
	const [autoFillLoading, setAutoFillLoading] = useState(false);
	const [currentUser] = useAuthState(auth);

	return (
		<Formik
			initialValues={defaultValues ?? emptyAddressFormValues}
			validationSchema={AddressFormSchema}
			onSubmit={async (values, action) => {
				if (id && defaultValues) {
					await updateDoc(
						doc(db, "users", currentUser?.uid ?? "-", "addresses", id ?? "-"),
						{
							...values,
							userId: currentUser?.uid,
						}
					);
				} else {
					await addDoc(
						collection(db, "users", currentUser?.uid ?? "-", "addresses"),
						{
							...values,
							userId: currentUser?.uid,
							isDefault: false,
							createdAt: serverTimestamp(),
						}
					);
				}
				action.resetForm();

				if (closeModal) {
					closeModal();
				}
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<Stack spacing="4">
						<HStack
							as={Card}
							p={2}
							justifyContent="space-around"
							bgGradient="linear(to-r, teal.500, green.500)"
						>
							<Text fontWeight="semibold">
								Save time. Autofill your current location.
							</Text>
							<Button
								isLoading={autoFillLoading}
								type="button"
								variant="solid"
								onClick={() => {
									setAutoFillLoading(true);
									if (navigator?.geolocation) {
										navigator.geolocation.getCurrentPosition(
											async (location) => {
												if (location) {
													const data = await getLocationInformation(
														location.coords.latitude,
														location.coords.longitude
													);
													props.setFieldValue("city", data.locality);
													props.setFieldValue(
														"state",
														data.principalSubdivision
													);
													props.setFieldValue("zip", data.postcode);
													props.setFieldValue("country", data.countryName);
												}
											}
										);
									}
									setAutoFillLoading(false);
								}}
							>
								Autofill
							</Button>
						</HStack>
						<HStack alignItems="flex-end">
							<Field name="name">
								{({ field, form }: any) => (
									<FormControl>
										<HStack justifyContent="space-between">
											<FormLabel>Name</FormLabel>
											<FormErrorMessage>{form.errors.name}</FormErrorMessage>
										</HStack>
										<Input {...field} type="text" maxLength={255} />
									</FormControl>
								)}
							</Field>
							{/* <ToggleButtonGroup<"home" | "work">
								name={register("type").name}
								onChange={(value) => setValue("type", value)}
								size="lg"
								defaultValue={defaultValues?.type ?? "home"}
								isAttached
								variant="outline"
								aria-label="Set Home or Work"
							>
								<ToggleButton
									value="home"
									aria-label="Home"
									icon={<AiOutlineHome />}
								/>
								<ToggleButton
									value="work"
									aria-label="Work"
									icon={<MdWorkOutline />}
								/>
							</ToggleButtonGroup> */}
						</HStack>
						<Field name="phone_number">
							{({ field, form }: any) => (
								<FormControl>
									<HStack justifyContent="space-between">
										<FormLabel>Phone Number</FormLabel>
										<FormErrorMessage>
											{form.errors.phone_number}
										</FormErrorMessage>
									</HStack>
									<Input {...field} type="numeric" />
								</FormControl>
							)}
						</Field>
						<Field name="address">
							{({ field, form }: any) => (
								<FormControl>
									<HStack justifyContent="space-between">
										<FormLabel>Address</FormLabel>
										<FormErrorMessage>{form.errors.address}</FormErrorMessage>
									</HStack>
									<Input {...field} type="text" />
								</FormControl>
							)}
						</Field>
						<HStack gap={3}>
							<Field name="city">
								{({ field, form }: any) => (
									<FormControl>
										<HStack justifyContent="space-between">
											<FormLabel>City</FormLabel>
											<FormErrorMessage>{form.errors.city}</FormErrorMessage>
										</HStack>
										<Input {...field} type="text" />
									</FormControl>
								)}
							</Field>

							<Field name="state">
								{({ field, form }: any) => (
									<FormControl>
										<HStack justifyContent="space-between">
											<FormLabel>State</FormLabel>
											<FormErrorMessage>{form.errors.state}</FormErrorMessage>
										</HStack>
										<Input {...field} type="text" />
									</FormControl>
								)}
							</Field>
						</HStack>
						<HStack gap={3}>
							<Field name="zip">
								{({ field, form }: any) => (
									<FormControl>
										<HStack justifyContent="space-between">
											<FormLabel>Zip Code</FormLabel>
											<FormErrorMessage>{form.errors.zip}</FormErrorMessage>
										</HStack>
										<Input {...field} type="text" />
									</FormControl>
								)}
							</Field>
							<Field name="country">
								{({ field, form }: any) => (
									<FormControl>
										<HStack justifyContent="space-between">
											<FormLabel>Country</FormLabel>
											<FormErrorMessage>{form.errors.country}</FormErrorMessage>
										</HStack>
										<Input {...field} type="text" />
									</FormControl>
								)}
							</Field>
						</HStack>

						<Button type="submit" colorScheme="blue" size="lg" fontSize="md">
							{defaultValues ? "Update Address" : "Create Address"}
						</Button>
					</Stack>
				</Form>
			)}
		</Formik>
	);
};

AddressForm.defaultProps = {
	id: null,
	defaultValues: null,
	onSubmissionSuccess: () => {},
};

export default AddressForm;

const getLocationInformation = async (lat: number, lng: number) => {
	const res = await fetch(
		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
	);
	const data = await res.json();
	return data;
};
