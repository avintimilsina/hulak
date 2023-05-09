import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
} from "@chakra-ui/react";
import { Field } from "formik";

const DestinationForm = () => (
	<Stack spacing="4">
		<HStack alignItems="flex-end">
			<Field name="destinationCountry">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.destinationCountry && form.touched.destinationCountry
						}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Country</FormLabel>
							<FormErrorMessage>
								{form.errors.destinationCountry}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
						<HStack justifyContent="space-between">
							<FormLabel>Full Name or Company Name</FormLabel>
							<FormErrorMessage>{form.errors.destinationName}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
						<HStack justifyContent="space-between">
							<FormLabel>Contact Name</FormLabel>
							<FormErrorMessage>
								{form.errors.destinationContactName}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
					<HStack justifyContent="space-between">
						<FormLabel>Address Line 1</FormLabel>
						<FormErrorMessage>
							{form.errors.destinationAddressLine1}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" />
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
					<HStack justifyContent="space-between">
						<FormLabel>Address Line 2</FormLabel>
						<FormErrorMessage>
							{form.errors.destinationAddressLine2}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" />
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
						<HStack justifyContent="space-between">
							<FormLabel>Zip Code</FormLabel>
							<FormErrorMessage>{form.errors.destinationZip}</FormErrorMessage>
						</HStack>
						<Input {...field} type="numeric" />
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
						<HStack justifyContent="space-between">
							<FormLabel>City</FormLabel>
							<FormErrorMessage>{form.errors.destinationCity}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" />
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
						<HStack justifyContent="space-between">
							<FormLabel>State</FormLabel>
							<FormErrorMessage>
								{form.errors.destinationState}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" />
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
						<HStack justifyContent="space-between">
							<FormLabel>Email</FormLabel>
							<FormErrorMessage>
								{form.errors.destinationEmail}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="email" />
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
						<HStack justifyContent="space-between">
							<FormLabel>Phone Number</FormLabel>
							<FormErrorMessage>
								{form.errors.destinationPhoneNumber}
							</FormErrorMessage>
						</HStack>
						<Input {...field} type="numeric" />
					</FormControl>
				)}
			</Field>
		</HStack>
	</Stack>
);

export default DestinationForm;
