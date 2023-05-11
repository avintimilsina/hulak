import {
	Stack,
	HStack,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Heading,
	Card,
	CardBody,
} from "@chakra-ui/react";
import { Field } from "formik";

const SendFrom = () => (
	<Card
		p="4"
		borderRadius="md"
		borderWidth="1px"
		boxShadow="md"
		borderColor="gray.200"
	>
		<CardBody>
			<Stack spacing="4">
				<Heading size="md">Sender Details</Heading>
				<Field name="sourcePincode">
					{({ field, form }: any) => (
						<FormControl
							isInvalid={
								form.errors.sourcePincode && form.touched.sourcePincode
							}
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
								<FormErrorMessage>
									{form.errors.sourceDistrict}
								</FormErrorMessage>
							</HStack>
							<Input {...field} type="text" maxLength={255} />
						</FormControl>
					)}
				</Field>
			</Stack>
		</CardBody>
	</Card>
);

export default SendFrom;
