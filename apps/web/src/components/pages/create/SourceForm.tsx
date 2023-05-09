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

const SourceForm = () => (
	<Stack spacing="4">
		<Heading>Where are you shipping from?</Heading>
		<HStack alignItems="flex-end">
			<Field name="sourceCountry">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceCountry && form.touched.sourceCountry}
					>
						<FormLabel>Country</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>{form.errors.sourceCountry}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack gap={3}>
			<Field name="sourceName">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceName && form.touched.sourceName}
					>
						<FormLabel>Full Name or Company Name</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>{form.errors.sourceName}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="sourceContactName">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.sourceContactName && form.touched.sourceContactName
						}
					>
						<FormLabel>Contact Name</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>{form.errors.sourceContactName}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<Field name="sourceAddressLine1">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.sourceAddressLine1 && form.touched.sourceAddressLine1
					}
				>
					<FormLabel>Address Line 1</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>{form.errors.sourceAddressLine1}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="sourceAddressLine2">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.sourceAddressLine2 && form.touched.sourceAddressLine2
					}
				>
					<FormLabel>Address Line 2</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>{form.errors.sourceAddressLine1}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<HStack gap={3}>
			<Field name="sourceZip">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceZip && form.touched.sourceZip}
					>
						<FormLabel>Zip Code</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.sourceZip}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="sourceCity">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceCity && form.touched.sourceCity}
					>
						<FormLabel>City</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.sourceCity}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="sourceState">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceState && form.touched.sourceState}
					>
						<FormLabel>State</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.sourceState}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack>
			<Field name="sourceEmail">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceEmail && form.touched.sourceEmail}
					>
						<FormLabel>Email</FormLabel>
						<Input {...field} type="email" />
						<FormErrorMessage>{form.errors.sourceEmail}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="sourcePhoneNumber">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.sourcePhoneNumber && form.touched.sourcePhoneNumber
						}
					>
						<FormLabel>Phone Number</FormLabel>
						<Input {...field} type="numeric" />
						<FormErrorMessage>{form.errors.sourcePhoneNumber}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
	</Stack>
);

export default SourceForm;
