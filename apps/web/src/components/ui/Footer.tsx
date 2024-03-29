import {
	useColorModeValue,
	Box,
	Heading,
	Stack,
	Text,
	IconButton,
	ButtonGroup,
	ButtonGroupProps,
	HeadingProps,
	Link,
	SimpleGrid,
	StackDivider,
} from "@chakra-ui/react";
import { FiArrowUpRight } from "react-icons/fi";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "@/components/logo";
import { useTranslations } from "next-intl";

// ? Footer is the component that is displayed at the bottom of the Landing page.

const Footer = () => {
	const t = useTranslations("Footer");

	return (
		<Box
			as="section"
			mt={{ base: 0, lg: 8 }}
			px={{ base: "6", md: "36" }}
			bg={useColorModeValue("black", "gray.800")}
			borderTopRadius="3xl"
			color="white"
		>
			<Stack
				justifyContent="space-between"
				alignItems="center"
				maxW={{ base: "xl", md: "7xl" }}
				mx="auto"
				py={8}
				direction={{ base: "column", lg: "row" }}
			>
				<Heading
					fontFamily="monospace"
					fontSize={{ base: "4xl", lg: "6xl" }}
					fontWeight="normal"
				>
					<Text as="span" color="brand.500">
						{t("heading.section1")}{" "}
					</Text>{" "}
					{t("heading.section2")}{" "}
					<Text as="span" color="brand.500">
						{t("heading.section3")}
					</Text>{" "}
					{t("heading.section4")}
				</Heading>
				<Box bg="gray.900" borderRadius="3xl" py="10">
					<IconButton
						aria-label="Icon"
						size="lg"
						p={8}
						icon={<FiArrowUpRight size="128" />}
						colorScheme="brand"
						variant="ghost"
						_hover={{ bg: "gray.900", opcaity: "0.8" }}
					/>
				</Box>
			</Stack>

			<Stack spacing="10" divider={<StackDivider />}>
				<Box />
				<Box />
			</Stack>

			<Box
				as="footer"
				role="contentinfo"
				mx="auto"
				maxW="7xl"
				py="12"
				px={{ base: "4", md: "8" }}
			>
				<Stack
					direction={{ base: "column", lg: "row" }}
					spacing={{ base: "10", lg: "28" }}
					justifyContent="space-between"
				>
					<Stack>
						<Logo h={8} alignContent="center" />
						<Box mt={2} maxW="sm">
							{t("description")}
							<Text mt="3" opacity="0.8">
								support@hulak.com
							</Text>
						</Box>
					</Stack>
					<Stack
						direction={{ base: "column", md: "row" }}
						spacing={{ base: "10", md: "20" }}
					>
						<SimpleGrid
							columns={2}
							spacing={{ base: "10", md: "20", lg: "28" }}
							flex="1"
						>
							<Box minW="130px">
								<FooterHeading mb="4">{t("product")}</FooterHeading>
								<Stack>
									<Link href="/quote">{t("get-a-quote")}</Link>
									<Link href="/create-order">{t("start-shipping")}</Link>
									<Link href="/support">{t("contact-us")}</Link>
								</Stack>
							</Box>
							<Box minW="130px">
								<FooterHeading mb="4">{t("legal")}</FooterHeading>
								<Stack>
									<Link href="/#">{t("privacy")}</Link>
									<Link href="/#">{t("terms")}</Link>
									<Link href="/#">{t("license")}</Link>
								</Stack>
							</Box>
						</SimpleGrid>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
};

export default Footer;

export const FooterHeading = (props: HeadingProps) => (
	<Heading
		as="h4"
		color={useColorModeValue("gray.600", "gray.400")}
		fontSize="sm"
		fontWeight="semibold"
		textTransform="uppercase"
		letterSpacing="wider"
		{...props}
	/>
);

export const SocialMediaLinks = (props: ButtonGroupProps) => (
	<ButtonGroup variant="ghost" color="gray.600" {...props}>
		<IconButton
			as="a"
			href="#"
			aria-label="LinkedIn"
			icon={<FaLinkedin fontSize="20px" />}
		/>
		<IconButton
			as="a"
			href="#"
			aria-label="GitHub"
			icon={<FaGithub fontSize="20px" />}
		/>
		<IconButton
			as="a"
			href="#"
			aria-label="Twitter"
			icon={<FaTwitter fontSize="20px" />}
		/>
	</ButtonGroup>
);
