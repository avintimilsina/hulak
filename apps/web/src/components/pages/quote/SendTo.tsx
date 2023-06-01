import InputField from "@/components/ui/InputField";
import { HStack, Heading, VStack } from "@chakra-ui/react";

// ? SendFrom component is used to display the form for the sender details
const SendTo = () => (
	<VStack spacing="4" w="full">
		<Heading size="md" w="full">
			Reciever Details
		</Heading>
		<HStack w="full">
			<InputField name="destination.city" label="City" type="text" />
		</HStack>
	</VStack>
);

export default SendTo;
