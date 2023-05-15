import InputField from "@/components/ui/InputField";
import { HStack, Heading, VStack } from "@chakra-ui/react";

const SendTo = () => (
	<VStack spacing="4" w="full">
		<Heading size="md" w="full">
			Reciever Details
		</Heading>
		<HStack w="full">
			<InputField name="destinationPincode" label="Pincode" type="numeric" />
			<InputField name="destinationCity" label="City" type="text" />
			<InputField name="destinationDistrict" label="District" type="text" />
		</HStack>
	</VStack>
);

export default SendTo;
