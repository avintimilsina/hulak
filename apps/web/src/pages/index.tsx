import Navbar from "@/components/ui/navbar";
import { Link } from "@chakra-ui/next-js";
import {
	Box,
	BoxProps,
	Button,
	Card,
	CardBody,
	CardHeader,
	Divider,
	Flex,
	Grid,
	GridItem,
	GridItemProps,
	HStack,
	Heading,
	Img,
	SimpleGrid,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BiDollarCircle } from "react-icons/bi";

const HomePage = () => (
	<Box>
		<Navbar />
		<Box
			as="section"
			maxW={{ base: "xl", md: "7xl" }}
			mx="auto"
			my={8}
			px={{ base: "6", md: "8" }}
		>
			<Stack
				justifyContent="space-between"
				alignItems="center"
				direction={{ base: "column", lg: "row" }}
			>
				<Heading
					fontSize={{ base: "5xl", md: "8xl" }}
					fontWeight="normal"
					textAlign={{ base: "center", lg: "justify" }}
				>
					We will{" "}
					<Text as="span" color="brand.500">
						Deliver
					</Text>{" "}
					<br /> your{" "}
					<Text as="span" color="brand.500">
						Package!
					</Text>
				</Heading>
				<Text
					maxW="2xs"
					textAlign={{ base: "center", lg: "end" }}
					color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
				>
					Trust your package to us, we have been trusted by the whole world.
					your package must be safe
				</Text>
			</Stack>
			<VStack
				justifyContent="space-between"
				alignItems={{ base: "center", lg: "flex-start" }}
				w={{ base: "full", lg: "unset" }}
			>
				<Button
					as={Link}
					colorScheme="brand"
					size="lg"
					my={8}
					p={8}
					fontSize="xl"
					rounded="full"
					href="/create-order"
					_hover={{ textDecoration: "none" }}
				>
					Start Shipping
				</Button>
				<Stack
					direction={{ base: "row", lg: "column" }}
					alignItems="flex-end"
					justifyContent="space-between"
					w={{ base: "full", lg: "unset" }}
				>
					<Stat title="Years" value="10+" />
					<Stat title="Offices" value="18K+" accentColor="brand.500" />
					<Stat title="Vehicles" value="23K+" />
				</Stack>
				<Img
					display={{ base: "none", lg: "block" }}
					pos="absolute"
					top={-18}
					right={44}
					zIndex="-1"
					filter={useColorModeValue("sepia(0.9)", "none")}
					src="/assets/container.png"
					alt="Shipping"
				/>
			</VStack>
		</Box>
		<Box
			as="section"
			maxW={{ base: "xl", md: "7xl" }}
			my={{ base: 0, lg: 8 }}
			mx="auto"
			px={{ base: "6", md: "8" }}
			bg={useColorModeValue("black", "gray.800")}
			borderRadius="xl"
		>
			<Stack
				gap={{ base: 4, lg: 16 }}
				p={{ base: 4, lg: 16 }}
				my={{ base: 0, lg: 16 }}
				alignItems="flex-end"
				direction={{ base: "column", lg: "row" }}
			>
				<SimpleGrid columns={2} gap={4}>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						objectFit="cover"
						src="https://images.unsplash.com/photo-1473445730015-841f29a9490b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=450&q=80"
						alt="Shipping"
					/>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
						alt="Shipping"
					/>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						objectFit="cover"
						objectPosition="bottom"
						src="https://images.unsplash.com/photo-1582902281043-69c645f40cd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
						alt="Shipping"
					/>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						objectFit="cover"
						src="https://images.unsplash.com/photo-1492168732976-2676c584c675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
						alt="Shipping"
					/>
				</SimpleGrid>
				<VStack>
					<Heading
						fontSize={{ base: "4xl", lg: "7xl" }}
						fontWeight="normal"
						color={useColorModeValue("white", "black")}
						textAlign={{ base: "center", lg: "start" }}
					>
						We are
						<Text color="brand.500">#1 Logistics</Text> WORLDWIDE
					</Heading>
					<Text
						color={useColorModeValue("whiteAlpha.600", "whiteAlpha.400")}
						textAlign={{ base: "center", lg: "start" }}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					</Text>

					<Stack direction={{ base: "column", lg: "row" }} alignItems="center">
						<Button
							as={Link}
							href="/support"
							colorScheme="brand"
							size="lg"
							my={8}
							fontSize="xl"
							p={8}
							rounded="full"
							_hover={{
								textDecoration: "none",
							}}
						>
							Contact Us
						</Button>
						<Button
							as={Link}
							href="/quote"
							size="lg"
							color="white"
							my={8}
							fontSize="xl"
							p={8}
							rounded="full"
							variant="outline"
							leftIcon={<BiDollarCircle size="32" />}
							_hover={{
								bg: "brand.500",
								textDecoration: "none",
							}}
						>
							Get a Quote
						</Button>
					</Stack>
				</VStack>
			</Stack>
		</Box>
		<Box
			as="section"
			maxW={{ base: "xl", md: "7xl" }}
			mx="auto"
			my={8}
			px={{ base: "6", md: "8" }}
		>
			<HStack justifyContent="space-between">
				<Heading
					fontFamily="monospace"
					fontSize={{ base: "2xl", md: "4xl", lg: "7xl" }}
					fontWeight="normal"
					textAlign="justify"
				>
					<Text as="span" color="brand.500">
						Everything
					</Text>{" "}
					you <br />
					need we have!
				</Heading>
				<Text
					maxW="xs"
					textAlign="start"
					fontSize={{ base: "sm", lg: "md" }}
					color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
				>
					we treat costumer like KING. everything you need. everything is in us,
					Come with Hulak guaranteed fast!
				</Text>
			</HStack>
			<Grid
				w="full"
				templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(4, 1fr)" }}
				my={4}
				gap={4}
			>
				{FEATURE_CARDS.map((feature, index) => (
					<FeatureCard key={feature.title} {...feature} index={index} />
				))}
			</Grid>
		</Box>
	</Box>
);

export default HomePage;

interface StatProps extends BoxProps {
	title: string;
	value: string;
	accentColor?: string;
}
export const Stat = (props: StatProps) => {
	const { title, value, children, accentColor, ...rest } = props;
	return (
		<Box {...rest} w="full">
			<Flex
				as="dl"
				direction="column-reverse"
				w="full"
				alignItems={{ base: "center", lg: "flex-start" }}
			>
				<Heading
					as="dt"
					fontWeight="semibold"
					fontSize="2xl"
					color={accentColor}
				>
					{title}
				</Heading>
				<Box
					order={1}
					as="dd"
					fontSize={{ base: "3xl", md: "4xl" }}
					fontWeight="bold"
					color={accentColor}
				>
					{value}
				</Box>
			</Flex>
			<Divider aria-hidden my="4" borderWidth="2px" borderColor={accentColor} />
			<Box
				color={useColorModeValue("gray.600", "whiteAlpha.700")}
				fontWeight="medium"
			/>
		</Box>
	);
};

Stat.defaultProps = {
	accentColor: "blackalpha.600",
};

interface FeatureCardProps extends GridItemProps {
	title: string;
	children: ReactNode;
	index: number;
}

const FeatureCard = ({ title, children, index, ...rest }: FeatureCardProps) => {
	const isSpecial = index === 2 || index === 3;
	const backgroundColor = useColorModeValue("gray.100", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	return (
		<GridItem
			as={Card}
			{...rest}
			colSpan={{ base: 1, lg: isSpecial ? 2 : 1 }}
			bg={isSpecial ? "brand.500" : backgroundColor}
			color={isSpecial ? "white" : textColor}
			borderRadius="2xl"
			py={6}
		>
			<CardHeader>
				<Heading as="h3" size="lg" fontWeight="normal" letterSpacing="tight">
					{title}
				</Heading>
			</CardHeader>
			<CardBody>{children}</CardBody>
		</GridItem>
	);
};

const FEATURE_CARDS = [
	{
		title: "Real Time Tracking",
		children: (
			<Text>We use quality packaging for the safety of your goods!</Text>
		),
	},
	{
		title: "Packaging",
		children: (
			<Text>We use quality packaging for the safety of your goods!</Text>
		),
	},
	{
		title: "Mobile App Tracker",
		children: (
			<Text>
				You can track your package using mobile. This makes it easier for you to
				find out where your package is anytime and anywhere!
			</Text>
		),
	},
	{
		title: "Insurance Services",
		children: (
			<Text>
				We will provide insurance if your item is damaged in transit. So,
				don&apos;t worry if your item is damaged because we will take care of
				it!
			</Text>
		),
	},
	{
		title: "Pickup Delivery",
		children: (
			<Text>
				we will pick up your package at home. Wait there. we&apos;ll be there!
			</Text>
		),
	},
	{
		title: "24 Hours",
		children: (
			<Text>
				we will send your package non-stop so that it arrives quickly!
			</Text>
		),
	},
];
