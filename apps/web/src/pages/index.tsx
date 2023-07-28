import Footer from "@/components/ui/Footer";
import ServerNavbar from "@/components/ui/ServerNavbar";
import { Image, Link } from "@chakra-ui/next-js";
import {
	Box,
	BoxProps,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Flex,
	Grid,
	GridItem,
	GridItemProps,
	Heading,
	Icon,
	Img,
	SimpleGrid,
	Stack,
	Text,
	VStack,
	useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import nookies from "nookies";
import { IconType } from "react-icons";
import { BiWorld } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { FaPlane } from "react-icons/fa";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { useTranslations } from "next-intl";
import { adminSDK } from "../../firebase-admin";
import container from "../../public/assets/container.webp";

// ? This the landing page of the website

const HomePage = ({
	user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const MotionImg = motion(Image);

	const t = useTranslations("Home");

	return (
		<Box>
			{/* This displays the Navbar component at the top of the screen */}
			<ServerNavbar user={user} />
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
						{t("primary-heading.section1")}{" "}
						<Text as="span" color="brand.500">
							{t("primary-heading.section2")}
						</Text>{" "}
						<br /> {t("primary-heading.section3")}{" "}
						<Text as="span" color="brand.500">
							{t("primary-heading.section4")}
						</Text>
					</Heading>
					<Text
						maxW="2xs"
						textAlign={{ base: "center", lg: "end" }}
						color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
					>
						{t("primary-subheading")}
					</Text>
				</Stack>
				<VStack
					justifyContent="space-between"
					alignItems={{ base: "center", lg: "flex-start" }}
					w={{ base: "full", lg: "unset" }}
				>
					{/* Routes the user to create-order page if the user is logged in */}
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
						{t("hero-button")}
					</Button>
					<Stack
						direction={{ base: "row", lg: "column" }}
						alignItems="flex-end"
						justifyContent="space-between"
						w={{ base: "full", lg: "unset" }}
					>
						<Stat title={t("stats.year-label")} value={t("stats.year-count")} />
						<Stat
							title={t("stats.office-label")}
							value={t("stats.office-count")}
							accentColor="brand.500"
						/>
						<Stat
							title={t("stats.staff-label")}
							value={t("stats.staff-count")}
						/>
					</Stack>
					<MotionImg
						display={{ base: "none", lg: "block" }}
						pos="absolute"
						top={-18}
						right={44}
						zIndex="-1"
						filter={useColorModeValue("sepia(0.9)", "none")}
						src={container}
						alt="Shipping"
						// animation for the container image
						initial={{
							y: "-2%",
						}}
						animate={{
							y: 0,
							rotate: [0, 2.5, -2.5],
							scale: [1, 1.05, 1.05],
							stiffness: 100,
							type: "spring",
						}}
						transition={{
							duration: 5,
							ease: "easeInOut",
							times: [0, 0.2, 0.5, 0.8, 1],
							repeat: Infinity,
							repeatType: "reverse",
						}}
						layout
						priority
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
				borderRadius="3xl"
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
							{t("glimpse-heading.section1")}
							<Text color="brand.500">
								{t("glimpse-heading.section2")}
							</Text>{" "}
							{t("glimpse-heading.section3")}
						</Heading>
						<Text
							color={useColorModeValue("whiteAlpha.600", "whiteAlpha.400")}
							textAlign={{ base: "center", lg: "start" }}
						>
							{t("glimpse-subheading")}
						</Text>

						<Stack
							direction={{ base: "column", lg: "row" }}
							alignItems="center"
						>
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
								{t("contact-button")}
							</Button>
							{/* This button links to quote page */}
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
								leftIcon={<TbCurrencyRupeeNepalese size="32" />}
								_hover={{
									bg: "brand.500",
									textDecoration: "none",
								}}
							>
								{t("get-a-quote-button")}
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
				<Stack
					justifyContent="space-between"
					alignItems="center"
					direction={{ base: "column", lg: "row" }}
				>
					<Heading
						fontFamily="monospace"
						fontSize={{ base: "4xl", lg: "7xl" }}
						fontWeight="normal"
						textAlign="justify"
					>
						<Text as="span" color="brand.500">
							{t("feature-heading.section1")}
						</Text>{" "}
						{t("feature-heading.section2")} <br />
						{t("feature-heading.section3")}
					</Heading>
					<Text
						maxW="xs"
						textAlign={{ base: "center", lg: "start" }}
						fontSize={{ base: "sm", lg: "md" }}
						color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
					>
						{t("feature-subheading")}
					</Text>
				</Stack>
				<Grid
					w="full"
					templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(4, 1fr)" }}
					my={4}
					gap={4}
				>
					{FEATURE_CARDS.map((feature, index) => (
						<FeatureCard key={feature} slug={feature} index={index} />
					))}
				</Grid>
			</Box>

			<Box
				as="section"
				maxW={{ base: "xl", md: "7xl" }}
				mx="auto"
				my={16}
				px={{ base: "6", md: "8" }}
			>
				<Stack
					justifyContent="space-between"
					alignItems="center"
					direction={{ base: "column", lg: "row" }}
				>
					<Heading
						fontFamily="monospace"
						fontSize={{ base: "4xl", lg: "7xl" }}
						fontWeight="normal"
						textAlign="justify"
					>
						{t("delivery-heading.section1")}
						<br />
						{t("delivery-heading.section2")}{" "}
						<Text as="span" color="brand.500">
							{t("delivery-heading.section3")}
						</Text>{" "}
					</Heading>
					<Text
						maxW="xs"
						textAlign={{ base: "center", lg: "start" }}
						fontSize={{ base: "sm", lg: "md" }}
						color={useColorModeValue("blackAlpha.600", "blackAlpha.400")}
					>
						{t("delivery-subheading")}
					</Text>
				</Stack>
				<Grid
					w="full"
					templateColumns={{ base: "repeat(1,1fr)", lg: "repeat(3, 1fr)" }}
					my={4}
					gap={12}
				>
					{/* displays transportation card */}
					{SHIPPING_CARDS.map((shipping, index) => (
						<ShippingCard key={shipping.title} {...shipping} index={index} />
					))}
				</Grid>
				{/* <SimpleGrid
					columns={{ base: 2, sm: 4, md: 6 }}
					mt="8"
					spacing="6"
					color={useColorModeValue("inherit", "white")}
				>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.ChatMonkey h="6" opacity={0.64} />
					</Center>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.Finnik h="4" opacity={0.64} />
					</Center>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.Lighthouse h="5" opacity={0.64} />
					</Center>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.Plumtic h="5" opacity={0.64} />
					</Center>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.Wakanda h="5" opacity={0.64} />
					</Center>
					<Center py="4" px="8" rounded={{ md: "lg" }}>
						<Brand.WorkScout h="5" opacity={0.64} />
					</Center>
				</SimpleGrid> */}
			</Box>
			{/* Displays the footer component */}
			<Footer />
		</Box>
	);
};

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
	slug: string;
	index: number;
}

const FeatureCard = ({ slug, index, ...rest }: FeatureCardProps) => {
	const isSpecial = index === 2 || index === 3;
	const backgroundColor = useColorModeValue("gray.100", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");

	const t = useTranslations("Home");

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
					{t(`features.${slug}.title`)}
				</Heading>
			</CardHeader>
			<CardBody>{t(`features.${slug}.description`)}</CardBody>
		</GridItem>
	);
};

const FEATURE_CARDS = [
	"real-time-tracking",
	"packaging",
	"mobile-app-tracker",
	"insurances-services",
	"pickup-delivery",
	"24-hours",
];

interface ShippingCardProps extends GridItemProps {
	icon: IconType;
	title: string;
	index: number;
}

const ShippingCard = ({ icon, title, index, ...rest }: ShippingCardProps) => {
	const isSpecial = index === 2 || index === 3;
	const backgroundColor = useColorModeValue("gray.100", "gray.700");
	const textColor = useColorModeValue("gray.700", "gray.200");
	const t = useTranslations("Home");

	return (
		<GridItem
			as={Card}
			{...rest}
			bg={isSpecial ? "brand.500" : backgroundColor}
			color={isSpecial ? "white" : textColor}
			borderRadius="3xl"
			py={6}
			justifyContent="space-between"
		>
			<CardHeader>
				<Icon as={icon} boxSize={12} />
			</CardHeader>
			<CardFooter>
				<Heading fontSize="4xl" fontWeight="normal">
					{t(`delivery.${title}`)} <br /> {t(`delivery.shipping`)}
				</Heading>
			</CardFooter>
		</GridItem>
	);
};

const SHIPPING_CARDS = [
	{
		icon: BiWorld,
		title: "worldwide",
	},
	{
		icon: BsTruck,
		title: "ground",
	},
	{
		icon: FaPlane,
		title: "air",
	},
];

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	const cookies = nookies.get(ctx);
	if (!cookies.token) {
		return {
			props: {
				isLoggedIn: false,
				user: null,
				messages: (await import(`../messages/${ctx.locale}.json`)).default,
			},
		};
	}

	try {
		const token = await adminSDK.auth().verifyIdToken(cookies.token);
		if (!token) {
			return {
				props: {
					isLoggedIn: false,
					user: null,
					messages: (await import(`../messages/${ctx.locale}.json`)).default,
				},
			};
		}

		// the user is authenticated!
		const { uid } = token;
		const user = await adminSDK.auth().getUser(uid);

		return {
			props: {
				isLoggedIn: true,
				user: {
					uid: user.uid ?? null,
					email: user.email ?? null,
					displayName: user.displayName ?? null,
					photoURL: user.photoURL ?? null,
				},
				messages: (await import(`../messages/${ctx.locale}.json`)).default,
			},
		};
	} catch (error) {
		return {
			props: {
				isLoggedIn: false,
				user: null,
				messages: (await import(`../messages/${ctx.locale}.json`)).default,
			},
		};
	}
}
