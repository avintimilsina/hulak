import Navbar from "@/components/ui/navbar";
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
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaPlay } from "react-icons/fa";

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
			<HStack justifyContent="space-between">
				<Heading
					fontSize={{ base: "xl", md: "8xl" }}
					fontWeight="normal"
					textAlign="justify"
				>
					We will{" "}
					<Text as="span" color="#ff6913">
						Deliver
					</Text>{" "}
					<br /> your{" "}
					<Text as="span" color="#ff6913">
						Package!
					</Text>
				</Heading>
				<Text
					maxW="2xs"
					textAlign="end"
					color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
				>
					Trust your package to us, we have been trusted by the whole world.
					your package must be safe
				</Text>
			</HStack>
			<HStack justifyContent="space-between" alignItems="flex-start">
				<VStack>
					<Button
						bgColor="#ff6913"
						size="lg"
						color="white"
						my={8}
						fontSize="xl"
						p={8}
						rounded="full"
					>
						Get In Touch
					</Button>
					<Stat
						title="years of experience"
						value="10+"
						accentColor={useColorModeValue("#ff6913", "green.300")}
					/>
					<Stat title="Offices" value="18K+" />
					<Stat title="Vehicles" value="23K+" />
				</VStack>
				<Img
					pos="absolute"
					top={-18}
					right={44}
					zIndex="-1"
					filter={useColorModeValue("sepia(0.9)", "none")}
					src="/assets/container.png"
					alt="Screening talent"
				/>
			</HStack>
		</Box>
		<Box
			as="section"
			maxW={{ base: "xl", md: "7xl" }}
			my={8}
			mx="auto"
			px={{ base: "6", md: "8" }}
			bg={useColorModeValue("black", "gray.800")}
			borderRadius="xl"
		>
			<HStack gap={16} p={16} my={16} alignItems="flex-end">
				<SimpleGrid columns={2} gap={4}>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
						alt="Screening talent"
					/>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
						alt="Screening talent"
					/>
					<Img
						borderRadius="xl"
						aspectRatio={1 / 1}
						src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
						alt="Screening talent"
					/>
				</SimpleGrid>
				<VStack>
					<Heading fontSize="7xl" color={useColorModeValue("white", "black")}>
						We are
						<Text color="#ff6913">#1 Logistics</Text> WORLDWIDE
					</Heading>
					<Text color={useColorModeValue("whiteAlpha.600", "whiteAlpha.400")}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					</Text>

					<HStack>
						<Button
							bgColor="#ff6913"
							size="lg"
							color="white"
							my={8}
							fontSize="xl"
							p={8}
							rounded="full"
						>
							Get In Touch
						</Button>
						<Button
							size="lg"
							color="white"
							my={8}
							fontSize="xl"
							p={8}
							rounded="full"
							variant="outline"
							leftIcon={<FaPlay />}
						>
							Watch Video
						</Button>
					</HStack>
				</VStack>
			</HStack>
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
					fontSize={{ base: "xl", md: "7xl" }}
					fontWeight="normal"
					textAlign="justify"
				>
					<Text as="span" color="#ff6913">
						Everything
					</Text>{" "}
					you <br />
					need we have!
				</Heading>
				<Text
					maxW="xs"
					textAlign="start"
					color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
				>
					we treat costumer like KING. everything you need. everything is in us,
					Come with Hulak guaranteed fast!
				</Text>
			</HStack>
			<Grid w="full" templateColumns="repeat(4, 1fr)" my={4} gap={4}>
				{FEATURE_CARDS.map((feature, index) => (
					<FeatureCard key={feature.title} {...feature} index={index} />
				))}
			</Grid>
		</Box>
		{/* <Box as="section">
			<Box
				maxW={{ base: "xl", md: "7xl" }}
				mx="auto"
				px={{ base: "6", md: "8" }}
			>
				<Stack
					direction={{ base: "column", lg: "row" }}
					spacing={{ base: "3rem", lg: "2rem" }}
					mt="8"
					align={{ lg: "center" }}
					justify="space-between"
				>
					<Box flex="1" maxW={{ lg: "520px" }}>
						<Text
							size="xs"
							textTransform="uppercase"
							fontWeight="semibold"
							color={mode("blue.600", "blue.300")}
							letterSpacing="wide"
						>
							Hire Talents
						</Text>
						<Heading
							as="h1"
							size="3xl"
							color={mode("blue.600", "blue.300")}
							mt="8"
							fontWeight="extrabold"
							letterSpacing="tight"
						>
							Get world class talents for your project
						</Heading>
						<Text
							color={mode("gray.600", "gray.400")}
							mt="4"
							fontSize="lg"
							fontWeight="medium"
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</Text>
						<Stack direction={{ base: "column", md: "row" }} spacing="4" mt="8">
							<Button
								size="lg"
								minW="210px"
								colorScheme="blue"
								height="14"
								px="8"
							>
								Get Started
							</Button>
							<Button
								size="lg"
								bg="white"
								color="gray.900"
								_hover={{ bg: "gray.50" }}
								height="14"
								px="8"
								shadow="base"
								leftIcon={<Box as={HiPlay} fontSize="2xl" />}
							>
								Watch Demo
							</Button>
						</Stack>
						<Text mt="8" color={mode("gray.600", "gray.400")}>
							Already have an account store?{" "}
						</Text>
					</Box>
					<Box
						pos="relative"
						w={{ base: "full", lg: "700px" }}
						h={{ base: "auto", lg: "560px" }}
					>
						<Img
							w="full"
							pos="relative"
							zIndex="1"
							h={{ lg: "100%" }}
							objectFit="cover"
							src="https://img.freepik.com/free-vector/hand-drawn-transport-truck-with-location_23-2149153179.jpg?w=996&t=st=1685031782~exp=1685032382~hmac=1897955ee09207352a5fd6d0bea72dc5a5077b5e015031c01a5fcf8a053d0620"
							alt="Screening talent"
						/>
					</Box>
				</Stack>
			</Box>
			SectionSection
		</Box> */}
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
			<Flex as="dl" direction="column-reverse" w="full">
				<Box as="dt" fontWeight="bold">
					{title}
				</Box>
				<Box
					order={1}
					as="dd"
					fontSize={{ base: "3xl", md: "4xl" }}
					fontWeight="extrabold"
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
			colSpan={isSpecial ? 2 : 1}
			bg={isSpecial ? "#ff6913" : backgroundColor}
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
