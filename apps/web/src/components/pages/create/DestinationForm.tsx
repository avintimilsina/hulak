import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	Stack,
} from "@chakra-ui/react";
import { Field } from "formik";

const DestinationForm = () => (
	<Stack spacing="4">
		<Heading>Where is your shipping going?</Heading>
		<HStack alignItems="flex-end">
			<Field name="destinationCountry">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationCountry && form.touched.destinationCountry
						}
					>
						<FormLabel>Country</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>
							{form.errors.destinationCountry}
						</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack gap={3}>
			<Field name="destinationName">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationName && form.touched.destinationName
						}
					>
						<FormLabel>Full Name or Company Name</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>{form.errors.destinationName}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="destinationContactName">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationContactName &&
							form.touched.destinationContactName
						}
					>
						<FormLabel>Contact Name</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>
							{form.errors.destinationContactName}
						</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<Field name="destinationAddressLine1">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.destinationAddressLine1 &&
						form.touched.destinationAddressLine1
					}
				>
					<FormLabel>Address Line 1</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>
						{form.errors.destinationAddressLine1}
					</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="destinationAddressLine2">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.destinationAddressLine2 &&
						form.touched.destinationAddressLine2
					}
				>
					<FormLabel>Address Line 2</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>
						{form.errors.destinationAddressLine2}
					</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<HStack gap={3}>
			<Field name="destinationZip">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationZip && form.touched.destinationZip
						}
					>
						<FormLabel>Zip Code</FormLabel>
						<Input {...field} type="numeric" />
						<FormErrorMessage>{form.errors.destinationZip}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="destinationCity">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationCity && form.touched.destinationCity
						}
					>
						<FormLabel>City</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.destinationCity}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="destinationState">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationState && form.touched.destinationState
						}
					>
						<FormLabel>State</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.destinationState}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack>
			<Field name="destinationEmail">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationEmail && form.touched.destinationEmail
						}
					>
						<FormLabel>Email</FormLabel>
						<Input {...field} type="email" />
						<FormErrorMessage>{form.errors.destinationEmail}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="destinationPhoneNumber">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationPhoneNumber &&
							form.touched.destinationPhoneNumber
						}
					>
						<FormLabel>Phone Number</FormLabel>
						<Input {...field} type="numeric" />
						<FormErrorMessage>
							{form.errors.destinationPhoneNumber}
						</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
	</Stack>
);

export default DestinationForm;
