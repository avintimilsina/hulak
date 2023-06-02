import InputField from "@/components/ui/InputField";
import { Stack } from "@chakra-ui/react";

// ? DestinationForm component is used to display the form for the destination location details

const DestinationForm = () => (
	<Stack spacing="4">
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
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
		</Stack>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Email" name="destination.email" type="email" />
			<InputField
				label="Phone Number"
				name="destination.phoneNumber"
				type="numeric"
			/>
		</Stack>
		<InputField
			label="Address Line 1"
			name="destination.addressLine1"
			type="text"
		/>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField
				label="Address Line 2"
				name="destination.addressLine2"
				type="text"
			/>
			<InputField label="City" name="destination.city" type="text" />
		</Stack>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Zip Code" name="destination.zip" type="numeric" />
			<InputField label="State" name="destination.state" type="text" />
			<InputField label="Country" name="destination.country" type="text" />
		</Stack>
	</Stack>
);

export default DestinationForm;
