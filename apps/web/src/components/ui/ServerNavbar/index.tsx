import Logo from "@/components/logo";
import NAVLINKS from "@/config/navbar";
import { Link } from "@chakra-ui/next-js";
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue as mode,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSignOut } from "react-firebase-hooks/auth";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { doc, getDoc } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { auth, db } from "../../../../firebase";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import LocaleSwitcher from "../LocaleSwitcher";

// ? Navbar component is used to display the navbar in the website where it is used to navigate to different pages of the website

interface NavbarProps {
	user?: any;
}

const ServerNavbar = ({ user }: NavbarProps) => {
	const router = useRouter();
	const [signOut] = useSignOut(auth);
	const toast = useToast();

	const t = useTranslations("Navbar");

	const [showAdminButton, setShowAdminButton] = useState(false);

	useEffect(() => {
		const runThisNow = async () => {
			if (user?.uid) {
				const docSnap = await getDoc(doc(db, "admins", user?.uid));

				if (docSnap.data()?.isActive) {
					setShowAdminButton(true);
				}
			}
		};
		runThisNow();
	}, [user]);

	return (
		<Box
			// as="header"
			bg={mode("white", "gray.800")}
		>
			<Box maxW="7xl" mx="auto" py="4" borderBottom="2px solid black">
				<Flex
					// as="nav"
					justify="space-between"
					alignItems="center"
					my={4}
				>
					<Logo h="10" />
					<HStack display={{ base: "none", lg: "flex" }} spacing="8">
						{NAVLINKS.map((link) => {
							const { label, href } = link;
							return (
								// NavLink.Desktop is used to display the navbar links in the desktop view and display the active link in the navbar if the user is in that page
								<NavLink.Desktop
									key={label}
									href={href}
									active={router.asPath === href}
								>
									{t(`${label}`)}
								</NavLink.Desktop>
							);
						})}
					</HStack>
					<HStack>
						{/* if the user is logged in then display the dashboard along with the user Avatar and sign out button else display the start shipping button */}

						{user?.uid ? (
							<HStack display={{ base: "none", lg: "flex" }}>
								<Button
									as={Link}
									colorScheme="brand"
									rounded="xl"
									href="/account/orders"
									_hover={{ textDecoration: "none" }}
									w="full"
									px="10"
									size="lg"
								>
									{t("dashboard")}
								</Button>
								{/* this menu is used to display Account and Sign out button when the user clicks on the user avatar  and lets the user to naviagte to it */}
								<Menu placement="bottom">
									<MenuButton _focus={{ boxShadow: "none" }} w="full">
										<Avatar
											name={user.displayName ?? "name"}
											src={
												user.photoURL ??
												`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${user?.displayName}`
											}
											size="md"
										/>
									</MenuButton>
									<MenuList p="0" m="0" zIndex={2} minW="0" w="200px">
										<MenuItem
											as={Button}
											p="0"
											leftIcon={<BsPersonCircle />}
											variant="ghost"
											onClick={() => {
												router.push("/account");
											}}
										>
											{t("account")}
										</MenuItem>

										{showAdminButton && (
											<MenuItem
												as={Button}
												p="0"
												leftIcon={<RiAdminFill />}
												variant="ghost"
												onClick={() => {
													router.push("/admin");
												}}
											>
												{t("admin")}
											</MenuItem>
										)}

										<MenuItem
											borderColor="red.500"
											textColor="red.500"
											as={Button}
											p="0"
											leftIcon={<BiLogOut />}
											colorScheme="red"
											variant="ghost"
											onClick={async () => {
												const success = await signOut();
												if (success) {
													if (!toast.isActive("login")) {
														toast({
															title: `Logged out`,
															status: "success",
															isClosable: true,
															id: "login",
														});
													}
												}
												router.reload();
											}}
										>
											{t("sign-out")}
										</MenuItem>
									</MenuList>
								</Menu>
							</HStack>
						) : (
							<HStack>
								<Button
									as={Link}
									colorScheme="brand"
									display={{ base: "none", lg: "flex" }}
									rounded="xl"
									href="/auth/login"
									_hover={{ textDecoration: "none" }}
								>
									{t("get-started")}
								</Button>
							</HStack>
						)}
						<LocaleSwitcher />

						{/* triggers the mobile navbar to open if the user is in mobile view */}
						<Box ml="5">
							<MobileNav user={user} />
						</Box>
					</HStack>
				</Flex>
			</Box>
		</Box>
	);
};

export default ServerNavbar;

ServerNavbar.defaultProps = {
	user: null,
};
