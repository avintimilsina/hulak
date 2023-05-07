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
			<Field name="name">
				{({ field, form }: any) => (
					<FormControl>
						<FormLabel>Name</FormLabel>
						<Input {...field} type="text" maxLength={255} />
						<FormErrorMessage>{form.errors.name}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<Field name="phone_number">
			{({ field, form }: any) => (
				<FormControl>
					<FormLabel>Phone Number</FormLabel>
					<Input {...field} type="numeric" />
					<FormErrorMessage>{form.errors.phone_number}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="address">
			{({ field, form }: any) => (
				<FormControl>
					<FormLabel>Address</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>{form.errors.address}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<HStack gap={3}>
			<Field name="city">
				{({ field, form }: any) => (
					<FormControl>
						<FormLabel>City</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.city}</FormErrorMessage>
					</FormControl>
				)}
			</Field>

			<Field name="state">
				{({ field, form }: any) => (
					<FormControl>
						<FormLabel>State</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.state}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack gap={3}>
			<Field name="zip">
				{({ field, form }: any) => (
					<FormControl>
						<FormLabel>Zip Code</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.zip}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
			<Field name="country">
				{({ field, form }: any) => (
					<FormControl>
						<FormLabel>Country</FormLabel>
						<Input {...field} type="text" />
						<FormErrorMessage>{form.errors.country}</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</HStack>
	</Stack>
);

export default SourceForm;
