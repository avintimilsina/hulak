import InputField from "@/components/ui/InputField";
import { HStack, Stack } from "@chakra-ui/react";

const SourceForm = () => (
	<Stack spacing="4">
		<HStack gap={3}>
			<InputField
				label="Full Name or Company Name"
				name="source.name"
				type="text"
			/>
			<InputField label="Contact Name" name="source.contactName" type="text" />
		</HStack>
		<HStack>
			<InputField label="Email" name="source.email" type="email" />
			<InputField
				label="Phone Number"
				name="source.phoneNumber"
				type="numeric"
			/>
		</HStack>
		<InputField label="Address Line 1" name="source.addressLine1" type="text" />
		<HStack gap={3}>
			<InputField
				label="Address Line 2"
				name="source.addressLine2"
				type="text"
			/>
			<InputField label="City" name="source.city" type="text" />
		</HStack>
		<HStack gap={3}>
			<InputField label="Zip Code" name="source.zip" type="numeric" />
			<InputField label="State" name="source.state" type="text" />
			<InputField label="Country" name="source.country" type="text" />
		</HStack>
	</Stack>
);

export default SourceForm;
