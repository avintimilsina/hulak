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

import { AiOutlineSetting } from "react-icons/ai";
import { BiPackage, BiSupport } from "react-icons/bi";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { TbTruckReturn } from "react-icons/tb";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";
import Logo from "./Logo";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

const AdminSidebar = ({ onClose, ...rest }: SidebarProps) => {
	const router = useRouter();

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
				<Logo iconColor="blue.500" h="8" />
				<CloseButton
					onClick={onClose}
					display={{ base: "block", md: "none" }}
				/>
			</HStack>
			<Stack spacing={6}>
				<Stack>
					{ORDER_NAV_LINKS.map((link) => (
						<NavLink
							key={link.label}
							href={link.href}
							label={link.label}
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
							label={link.label}
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
							label={link.label}
							icon={link.icon}
							isActive={router.pathname === link.href}
						/>
					))}
				</Stack>
			</Stack>
			<Spacer />
			<UserProfile />
		</Flex>
	);
};

export default AdminSidebar;

export const ORDER_NAV_LINKS = [
	{
		label: "Orders",
		href: "/admin/orders/orders",
		icon: BiPackage,
	},
	{
		label: "Placed",
		href: "/admin/orders/placed",
		icon: TbTruckReturn,
	},
	{
		label: "Picked",
		href: "/admin/orders/picked",
		icon: TbTruckReturn,
	},
	{
		label: "Shipped",
		href: "/admin/orders/shipped",
		icon: TbTruckReturn,
	},
	{
		label: "Out for Delivery",
		href: "/admin/orders/out-for-delivery",
		icon: TbTruckReturn,
	},
	{
		label: "Deliverd",
		href: "/admin/orders/delivered",
		icon: TbTruckReturn,
	},
	{
		label: "Returns",
		href: "/admin/orders/returns",
		icon: TbTruckReturn,
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
		label: "Go Back Shopping",
		href: "/",
		icon: BsArrowReturnLeft,
	},
	{
		label: "Help Center",
		href: "/account/helpcenter",
		icon: BiSupport,
	},
];
