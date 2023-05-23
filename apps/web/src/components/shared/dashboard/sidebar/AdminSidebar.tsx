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
import { AiOutlineSetting } from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import { FaShippingFast, FaUser } from "react-icons/fa";
import { GiCardPickup } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";

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
				<Logo height="8" />
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
				<Spacer />
			</Stack>
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
		icon: BiPackage,
	},
	{
		label: "Picked",
		href: "/admin/orders/picked",
		icon: GiCardPickup,
	},
	{
		label: "Shipped",
		href: "/admin/orders/shipped",
		icon: FaShippingFast,
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
