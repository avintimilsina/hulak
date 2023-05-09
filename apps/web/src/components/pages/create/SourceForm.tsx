import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
} from "@chakra-ui/react";
import { Field } from "formik";

const SourceForm = () => (
	<Stack spacing="4">
		<HStack alignItems="flex-end">
			<Field name="sourceCountry">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceCountry && form.touched.sourceCountry}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Country</FormLabel>
							<FormErrorMessage>{form.errors.sourceCountry}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
						<HStack justifyContent="space-between">
							<FormLabel>Full Name or Company Name</FormLabel>
							<FormErrorMessage>{form.errors.sourceName}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
						<HStack justifyContent="space-between">
							<FormLabel>Contact Name</FormLabel>
							<FormErrorMessage>
								{form.errors.sourceContactName}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
					<HStack justifyContent="space-between">
						<FormLabel>Address Line 1</FormLabel>
						<FormErrorMessage>
							{form.errors.sourceAddressLine1}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" />
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
					<HStack justifyContent="space-between">
						<FormLabel>Address Line 2</FormLabel>
						<FormErrorMessage>
							{form.errors.sourceAddressLine1}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" />
				</FormControl>
			)}
		</Field>
		<HStack gap={3}>
			<Field name="sourceZip">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceZip && form.touched.sourceZip}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Zip Code</FormLabel>
							<FormErrorMessage>{form.errors.sourceZip}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" />
					</FormControl>
				)}
			</Field>
			<Field name="sourceCity">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceCity && form.touched.sourceCity}
					>
						<HStack justifyContent="space-between">
							<FormLabel>City</FormLabel>
							<FormErrorMessage>{form.errors.sourceCity}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" />
					</FormControl>
				)}
			</Field>
			<Field name="sourceState">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourceState && form.touched.sourceState}
					>
						<HStack justifyContent="space-between">
							<FormLabel>State</FormLabel>
							<FormErrorMessage>{form.errors.sourceState}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" />
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
						<HStack justifyContent="space-between">
							<FormLabel>Email</FormLabel>
							<FormErrorMessage>{form.errors.sourceEmail}</FormErrorMessage>
						</HStack>
						<Input {...field} type="email" />
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
						<HStack justifyContent="space-between">
							<FormLabel>Phone Number</FormLabel>
							<FormErrorMessage>
								{form.errors.sourcePhoneNumber}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="numeric" />
					</FormControl>
				)}
			</Field>
		</HStack>
	</Stack>
);

export default SourceForm;
