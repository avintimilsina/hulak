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
import { BiPackage } from "react-icons/bi";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import { GiCardPickup } from "react-icons/gi";
import { MdShoppingCartCheckout } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";
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
				<Logo height="10" />
				<CloseButton
					onClick={onClose}
					display={{ base: "block", md: "none" }}
				/>
			</HStack>
			<Stack spacing={3}>
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
			</Stack>
			<Spacer />
			<UserProfile />
		</Flex>
	);
};

export default AdminSidebar;

export const ORDER_NAV_LINKS = [
	{
		label: "Manage Admin",
		href: "/admin",
		icon: RiAdminLine,
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
		icon: MdShoppingCartCheckout,
	},
	{
		label: "Delivered",
		href: "/admin/orders/delivered",
		icon: BsFillClipboardCheckFill,
	},
	{
		label: "Returns",
		href: "/admin/orders/returns",
		icon: TbTruckReturn,
	},
];
