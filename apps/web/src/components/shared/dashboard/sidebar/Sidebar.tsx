import {
	BoxProps,
	CloseButton,
	Divider,
	Flex,
	HStack,
	Spacer,
	Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import Logo from "@/components/logo";
import { useTranslations } from "next-intl";
import { AiOutlineSetting } from "react-icons/ai";
import { BiBox, BiHomeAlt, BiPackage, BiSupport } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

// ? Sidebar component is used to display the navigation links and user profile in the sidebar
interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const Sidebar = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter();
	const t = useTranslations("Sidebar");

	return (
		<Flex
			transition="3s ease"
			pos="fixed"
			height="100vh"
			width={{ base: "full", md: "xs" }}
			direction="column"
			borderRightWidth="1px"
			px={6}
			py={8}
			{...rest}
		>
			<HStack mb={8} justifyContent="space-between">
				<Logo height="10" />
				<CloseButton
					onClick={onClose}
					display={{ base: "block", md: "none" }}
				/>
			</HStack>
			<Stack spacing={6}>
				<Stack>
					{/* NavLink Component is called to display all the pages that are accessible to the user */}
					{/* Here Order links, account links and support links are divided in different categories for modularity */}
					{ORDER_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={t(link.label)}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
				<Divider />
				<Stack>
					{ACCOUNT_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={t(link.label)}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
				<Divider />
				<Stack>
					{SUPPORT_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={t(link.label)}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
			</Stack>
			<Spacer />
			{/* UserProfile component is called to display the currentUser information along with the option to logout from the site */}
			<UserProfile />
		</Flex>
	);
};

export default Sidebar;

export const ORDER_NAV_LINKS = [
	{
		label: "Orders",
		href: "/account/orders",
		icon: BiPackage,
	},
	{
		label: "Returns",
		href: "/account/returns",
		icon: TbTruckReturn,
	},
	{
		label: "Address",
		href: "/account/address",
		icon: BiHomeAlt,
	},
];

export const ACCOUNT_NAV_LINKS = [
	{
		label: "Account",
		href: "/account",
		icon: FaUser,
	},
	{
		label: "Preference",
		href: "/account/preference",
		icon: AiOutlineSetting,
	},
];

export const SUPPORT_NAV_LINKS = [
	{
		label: "Shipping",
		href: "/create-order",
		icon: BiBox,
	},
	{
		label: "Help Center",
		href: "/account/helpcenter",
		icon: BiSupport,
	},
];
