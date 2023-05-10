import {
	Stack,
	HStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Heading,
} from "@chakra-ui/react";
import { Field } from "formik";

const SendTo = () => (
	<Stack spacing="4">
		<Heading size="md">Receiver Details</Heading>
		<Field name="destinationPincode">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.destinationPincode && form.touched.destinationPincode
					}
				>
					<HStack justifyContent="space-between">
						<FormLabel>Pincode</FormLabel>
						<FormErrorMessage>
							{form.errors.destinationPincode}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" maxLength={255} />
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
					<Input {...field} type="text" maxLength={255} />
				</FormControl>
			)}
		</Field>
		<Field name="destinationDistrict">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.destinationDistrict && form.touched.destinationDistrict
					}
				>
					<HStack justifyContent="space-between">
						<FormLabel>District</FormLabel>
						<FormErrorMessage>
							{form.errors.destinationDistrict}
						</FormErrorMessage>
					</HStack>
					<Input {...field} type="text" maxLength={255} />
				</FormControl>
			)}
		</Field>
	</Stack>
);

export default SendTo;
