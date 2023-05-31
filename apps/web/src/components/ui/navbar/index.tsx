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
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { auth } from "../../../../firebase";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";

const Navbar = () => {
	const router = useRouter();
	const [currentUser] = useAuthState(auth);
	const [signOut] = useSignOut(auth);
	const toast = useToast();

	return (
		<Box as="header" bg={mode("white", "gray.800")}>
			<Box maxW="7xl" mx="auto" py="4" borderBottom="2px solid black">
				<Flex as="nav" justify="space-between" alignItems="center" my={4}>
					<Logo h="10" />
					<HStack display={{ base: "none", lg: "flex" }} spacing="8">
						{NAVLINKS.map((link) => {
							const { label, href } = link;
							return (
								<NavLink.Desktop
									key={label}
									href={href}
									active={router.asPath === href}
								>
									{label}
								</NavLink.Desktop>
							);
						})}
					</HStack>
					<HStack>
						{currentUser ? (
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
									Dashboard
								</Button>

								<Menu placement="bottom">
									<MenuButton _focus={{ boxShadow: "none" }} w="full">
										<Avatar
											name={currentUser.displayName ?? "name"}
											src={
												currentUser.photoURL ??
												`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${currentUser?.displayName}`
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
											Account
										</MenuItem>
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
											}}
										>
											Sign out
										</MenuItem>
									</MenuList>
								</Menu>
							</HStack>
						) : (
							<Button
								as={Link}
								colorScheme="brand"
								display={{ base: "none", lg: "flex" }}
								rounded="xl"
								href="/auth/register"
								_hover={{ textDecoration: "none" }}
							>
								Start Shipping
							</Button>
						)}
						<Box ml="5">
							<MobileNav />
						</Box>
					</HStack>
				</Flex>
			</Box>
		</Box>
	);
};

export default Navbar;
