import InputField from "@/components/ui/InputField";
import { HStack, Stack } from "@chakra-ui/react";

const DestinationForm = () => (
	<Stack spacing="4">
		<HStack gap={3}>
			<InputField label="Full Name or Company Name" name="destination.name" />
			<InputField label="Contact Name" name="destination.contactName" />
		</HStack>
		<HStack>
			<InputField label="Email" name="destination.email" />
			<InputField label="Phone Number" name="destination.phoneNumber" />
		</HStack>
		<InputField label="Address Line 1" name="destination.addressLine1" />
		<HStack gap={3}>
			<InputField label="Address Line 2" name="destination.addressLine2" />
			<InputField label="City" name="destination.city" />
		</HStack>
		<HStack gap={3}>
			<InputField label="Zip Code" name="destination.zip" />
			<InputField label="State" name="destination.state" />
			<InputField label="Country" name="destination.country" />
		</HStack>
	</Stack>
);

export default DestinationForm;
