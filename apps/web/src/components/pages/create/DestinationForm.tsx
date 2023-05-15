import InputField from "@/components/ui/InputField";
import { HStack, Stack } from "@chakra-ui/react";

const DestinationForm = () => (
	<Stack spacing="4">
		<HStack gap={3}>
			<InputField
				label="Full Name or Company Name"
				name="destination.name"
				type="text"
			/>
			<InputField
				label="Contact Name"
				name="destination.contactName"
				type="text"
			/>
		</HStack>
		<HStack>
			<InputField label="Email" name="destination.email" type="email" />
			<InputField
				label="Phone Number"
				name="destination.phoneNumber"
				type="numeric"
			/>
		</HStack>
		<InputField
			label="Address Line 1"
			name="destination.addressLine1"
			type="text"
		/>
		<HStack gap={3}>
			<InputField
				label="Address Line 2"
				name="destination.addressLine2"
				type="text"
			/>
			<InputField label="City" name="destination.city" type="text" />
		</HStack>
		<HStack gap={3}>
			<InputField label="Zip Code" name="destination.zip" type="numeric" />
			<InputField label="State" name="destination.state" type="text" />
			<InputField label="Country" name="destination.country" type="text" />
		</HStack>
	</Stack>
);

export default DestinationForm;
