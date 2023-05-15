import InputField from "@/components/ui/InputField";
import { HStack, Heading, VStack } from "@chakra-ui/react";

const SendFrom = () => (
	<VStack spacing="4" w="full">
		<Heading size="md" w="full">
			Sender Details
		</Heading>
		<HStack w="full">
			<InputField name="source.city" label="City" type="text" />
		</HStack>
	</VStack>
);

export default SendFrom;
