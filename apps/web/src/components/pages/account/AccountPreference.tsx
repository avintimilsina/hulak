import type { BoxProps } from "@chakra-ui/react";
import {
	Box,
	Button,
	Card,
	FormControl,
	FormLabel,
	Select,
	Stack,
	StackDivider,
	Switch,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";

// ? AccountPreference is a component where the user can change their preferences like language and currency

const AccountPreference = () => (
	<Card p="4">
		<Stack divider={<StackDivider />} spacing="6">
			<FieldGroup
				title="Language"
				description="Change your preferred language and currency"
			>
				<Stack
					direction={{ base: "column", md: "row" }}
					width="full"
					spacing="4"
				>
					<FormControl id="language">
						<FormLabel fontSize="sm">Language</FormLabel>
						<Select size="sm" maxW="2xs">
							<option>English</option>
							<option>Hebrew</option>
							<option>Arabic</option>
						</Select>
					</FormControl>

					<FormControl id="currency">
						<FormLabel fontSize="sm">Currency</FormLabel>
						<Select size="sm" maxW="2xs">
							<option>NPR (रु)</option>
							<option>USD ($)</option>
							<option>INR (₹)</option>
						</Select>
					</FormControl>
				</Stack>
				<Button mt="5" size="sm" fontWeight="normal" colorScheme="brand">
					Save Changes
				</Button>
			</FieldGroup>

			<FieldGroup
				title="Communications"
				description="Manage your email preference"
			>
				<Stack spacing="3">
					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="email-marketing" flex="1" fontSize="sm" mb="0">
							Product intro, tips, and inspiration
						</FormLabel>
						<Switch id="email-marketing" colorScheme="brand" />
					</FormControl>
					<FormControl display="flex" alignItems="center">
						<FormLabel htmlFor="email-news" flex="1" fontSize="sm" mb="0">
							Updates about company news and features
						</FormLabel>
						<Switch id="email-news" colorScheme="brand" />
					</FormControl>
				</Stack>
				<Button mt="5" size="sm" fontWeight="normal" colorScheme="brand">
					Save Changes
				</Button>
			</FieldGroup>
		</Stack>
	</Card>
);

export default AccountPreference;

interface FieldGroupProps extends BoxProps {
	title: string;
	description: string;
}

const FieldGroup = (props: FieldGroupProps) => {
	const { title, description, ...boxProps } = props;
	return (
		<Box>
			<Text as="h3" fontWeight="bold" fontSize="lg">
				{title}
			</Text>
			{description && (
				<Text color={mode("gray.600", "gray.300")} fontSize="sm">
					{description}
				</Text>
			)}

			<Box pt="5" {...boxProps} />
		</Box>
	);
};
