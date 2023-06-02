import InputField from "@/components/ui/InputField";
import { Stack } from "@chakra-ui/react";

// ? SourceForm component is used to display the form for the source location details

const SourceForm = () => (
	<Stack spacing="4">
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField
				label="Full Name or Company Name"
				name="source.name"
				type="text"
			/>
			<InputField label="Contact Name" name="source.contactName" type="text" />
		</Stack>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Email" name="source.email" type="email" />
			<InputField
				label="Phone Number"
				name="source.phoneNumber"
				type="numeric"
			/>
		</Stack>
		<InputField label="Address Line 1" name="source.addressLine1" type="text" />
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField
				label="Address Line 2"
				name="source.addressLine2"
				type="text"
			/>
			<InputField label="City" name="source.city" type="text" />
		</Stack>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Zip Code" name="source.zip" type="numeric" />
			<InputField label="State" name="source.state" type="text" />
			<InputField label="Country" name="source.country" type="text" />
		</Stack>
	</Stack>
);

export default SourceForm;
