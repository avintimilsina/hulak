import {
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Heading,
	Input,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";

const SustinableForm = () => (
	<Stack spacing="4">
		<Heading>Almost Done. Let&apos;s check a few more details.</Heading>
		<Field name="packageDescription">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.packageDescription && form.touched.packageDescription
					}
				>
					<HStack justifyContent="space-between">
						<FormLabel>What are you shipping?(Write in detail)</FormLabel>
						<FormErrorMessage>
							{form.errors.packageDescription}
						</FormErrorMessage>
					</HStack>
					<Input as={Textarea} {...field} type="text" maxLength={255} />
				</FormControl>
			)}
		</Field>
		<Field name="deliverOnlyToReceiver" type="checkbox">
			{({ field, form }: any) => (
				<FormControl>
					<Checkbox {...field}>Deliver only to receivers address (+$)</Checkbox>
					<FormErrorMessage>
						{form.errors.deliverOnlyToReceiver}
					</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="isCarbonNeutral" type="checkbox">
			{({ field, form }: any) => (
				<FormControl>
					<Checkbox {...field}>
						Carbon Neutral-Offset the environmental impact of your shipment (+$)
					</Checkbox>
					<FormErrorMessage>{form.errors.isCarbonNeutral}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	</Stack>
);

export default SustinableForm;
