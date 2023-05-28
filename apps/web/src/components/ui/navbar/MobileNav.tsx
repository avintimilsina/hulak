import Logo from "@/components/logo";
import NAVLINKS from "@/config/navbar";
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	HStack,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
	SimpleGrid,
	VStack,
	useColorModeValue as mode,
	useBoolean,
	useFocusOnShow,
	useToast,
	Text,
} from "@chakra-ui/react";
import { HTMLMotionProps, Variants, motion } from "framer-motion";
import * as React from "react";
import FocusLock from "react-focus-lock";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { RemoveScroll } from "react-remove-scroll";
import { Link } from "@chakra-ui/next-js";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import router from "next/router";
import { BiLogOut } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import { auth } from "../../../../firebase";
import NavLink from "./NavLink";

const variants: Variants = {
	show: {
		display: "revert",
		opacity: 1,
		scale: 1,
		transition: { duration: 0.2, ease: "easeOut" },
	},
	hide: {
		opacity: 0,
		scale: 0.98,
		transition: { duration: 0.1, ease: "easeIn" },
		transitionEnd: { display: "none" },
	},
};

const Backdrop = ({ show }: { show?: boolean }) => (
	<Portal>
		<motion.div
			initial={false}
			animate={show ? "show" : "hide"}
			transition={{ duration: 0.1 }}
			variants={{
				show: { opacity: 1, display: "revert" },
				hide: { opacity: 0, transitionEnd: { display: "none" } },
			}}
			style={{
				width: "100%",
				height: "100vh",
				position: "absolute",
				background: "rgba(0,0,0,0.2)",
				inset: 0,
			}}
		/>
	</Portal>
);

Backdrop.defaultProps = {
	show: false,
};

const Transition = (props: HTMLMotionProps<"div"> & { in?: boolean }) => {
	const { in: inProp, ...rest } = props;
	return (
		<motion.div
			{...rest}
			initial={false}
			variants={variants}
			animate={inProp ? "show" : "hide"}
			style={{
				transformOrigin: "top right",
				position: "absolute",
				width: "calc(100% - 32px)",
				top: "24px",
				left: "16px",
				margin: "0 auto",
				zIndex: 1,
			}}
		/>
	);
};
Transition.defaultProps = {
	in: false,
};

const MobileNav = () => {
	const toast = useToast();
	const [currentUser] = useAuthState(auth);
	const [signOut] = useSignOut(auth);
	const [show, { toggle, off }] = useBoolean();
	const ref = React.useRef<HTMLDivElement>(null);
	useFocusOnShow(ref, { visible: show, shouldFocus: true });

	return (
		<>
			<Box
				as="button"
				type="button"
				p="1"
				fontSize="2xl"
				color="gray.600"
				onClick={toggle}
				display={{ base: "block", lg: "none" }}
			>
				<HiOutlineMenu />
			</Box>

			<Transition in={show}>
				<RemoveScroll enabled={show}>
					<Backdrop show={show} />
				</RemoveScroll>
				<FocusLock disabled={!show} returnFocus>
					<Box
						bg={mode("white", "gray.700")}
						shadow="lg"
						rounded="lg"
						ref={ref}
						tabIndex={0}
						outline={0}
					>
						<Box pt="5" pb="6" px="5">
							<Flex justify="space-between" align="center">
								<Logo h="10" />
								<Box mr="-2" mt="-2">
									<Center
										as="button"
										type="button"
										onClick={off}
										rounded="base"
										p="1"
										color={mode("gray.600", "gray.400")}
										_hover={{ bg: mode("gray.100", "gray.600") }}
									>
										<Box srOnly>Close menu</Box>
										<HiOutlineX aria-hidden fontSize="1.5rem" />
									</Center>
								</Box>
							</Flex>
							<SimpleGrid as="nav" gap="6" mt="8" columns={{ base: 1, sm: 2 }}>
								{NAVLINKS.map((link) => {
									const { label, href, icon } = link;
									return (
										<NavLink.Mobile key={label} href={href} icon={icon}>
											{label}
										</NavLink.Mobile>
									);
								})}
							</SimpleGrid>
							{!currentUser ? (
								<VStack mt="8" spacing="4">
									<Button
										w="full"
										colorScheme="brand"
										as={Link}
										href="/create-order"
									>
										Start Shipping
									</Button>
									<Box textAlign="center" fontWeight="medium">
										Have an account?{" "}
										<Box as="a" color={mode("blue.600", "blue.400")}>
											Log in
										</Box>
									</Box>
								</VStack>
							) : (
								<VStack>
									<Button
										as={Link}
										colorScheme="brand"
										rounded="xl"
										href="/account/orders"
										_hover={{ textDecoration: "none" }}
										w="full"
										px="10"
										my="4"
										size="lg"
									>
										Dashboard
									</Button>

									<Menu placement="bottom">
										<MenuButton _focus={{ boxShadow: "none" }} w="full">
											<HStack justify="center" w="full" gap={4}>
												<VStack align="flex-start">
													<Text
														fontWeight="medium"
														fontSize="lg"
														lineHeight={0.4}
														color={mode("gray.600", "gray.400")}
													>
														{currentUser.displayName ?? "name"}
													</Text>
													<Text fontWeight="normal">
														{currentUser.email ?? "name"}
													</Text>
												</VStack>

												<Avatar
													name={currentUser.displayName ?? "name"}
													src={
														currentUser.photoURL ??
														`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${currentUser?.displayName}`
													}
													size="md"
												/>
											</HStack>
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
								</VStack>
							)}
						</Box>
					</Box>
				</FocusLock>
			</Transition>
		</>
	);
};

export default MobileNav;
