import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	VStack,
} from "@chakra-ui/react";
import { Field } from "formik";

const SendFrom = () => (
	<VStack spacing="4" w="full">
		<Heading size="md" w="full">
			Sender Details
		</Heading>
		<HStack w="full">
			<Field name="sourcePincode">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.sourcePincode && form.touched.sourcePincode}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Pincode</FormLabel>
							<FormErrorMessage>{form.errors.sourcePincode}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
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
						<Input {...field} type="text" maxLength={255} />
					</FormControl>
				)}
			</Field>
			<Field name="sourceDistrict">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={
							form.errors.sourceDistrict && form.touched.sourceDistrict
						}
					>
						<HStack justifyContent="space-between">
							<FormLabel>District</FormLabel>
							<FormErrorMessage>{form.errors.sourceDistrict}</FormErrorMessage>
						</HStack>
						<Input {...field} type="text" maxLength={255} />
					</FormControl>
				)}
			</Field>
		</HStack>
	</VStack>
);

export default SendFrom;
