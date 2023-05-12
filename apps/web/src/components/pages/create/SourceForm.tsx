import InputField from "@/components/ui/InputField";
import { HStack, Stack } from "@chakra-ui/react";

const SourceForm = () => (
	<Stack spacing="4">
		<HStack gap={3}>
			<InputField label="Full Name or Company Name" name="source.name" />
			<InputField label="Contact Name" name="source.contactName" />
		</HStack>
		<HStack>
			<InputField label="Email" name="source.email" />
			<InputField label="Phone Number" name="source.phoneNumber" />
		</HStack>
		<InputField label="Address Line 1" name="source.addressLine1" />
		<HStack gap={3}>
			<InputField label="Address Line 2" name="source.addressLine2" />
			<InputField label="City" name="source.city" />
		</HStack>
		<HStack gap={3}>
			<InputField label="Zip Code" name="source.zip" />
			<InputField label="State" name="source.state" />
			<InputField label="Country" name="source.country" />
		</HStack>
	</Stack>
);

export default SourceForm;
