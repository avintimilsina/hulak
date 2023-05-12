import CheckboxField from "@/components/ui/CheckboxField";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";

const SustinableForm = () => (
	<Stack spacing="4">
		<Field name="package.description">
			{({ field, meta }: any) => (
				<FormControl isInvalid={meta.error && meta.touched}>
					<HStack justifyContent="space-between">
						<FormLabel>What are you shipping?(Write in detail)</FormLabel>
						<FormErrorMessage>{meta.error}</FormErrorMessage>
					</HStack>
					<Input as={Textarea} {...field} type="text" maxLength={255} />
				</FormControl>
			)}
		</Field>
		<CheckboxField
			label="Deliver only to receivers address (+$)"
			name="deliverOnlyToReceiver"
		/>
		<CheckboxField
			label="Carbon Neutral-Offset the environmental impact of your shipment (+$)"
			name="isCarbonNeutral"
		/>
	</Stack>
);

export default SustinableForm;
