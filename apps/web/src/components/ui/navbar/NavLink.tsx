import { Link } from "@chakra-ui/next-js";
import {
	Box,
	Flex,
	HTMLChakraProps,
	Icon,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface DesktopNavLinkProps extends HTMLChakraProps<"a"> {
	active?: boolean;
}

// ? NavLink is divided into two components DesktopNavLink and MobileNavLink where different Navigation links are displayed in different views

const DesktopNavLink = (props: DesktopNavLinkProps) => {
	const { active, ...rest } = props;
	return (
		<Link
			href="/"
			aria-current={active ? "page" : undefined}
			fontSize="lg"
			color={mode("black", "gray.300")}
			{...rest}
			_activeLink={{
				color: mode("brand.500", "brand.300"),
				fontWeight: "semibold",
			}}
			_hover={{ textDecoration: "none" }}
		/>
	);
};

DesktopNavLink.defaultProps = {
	active: false,
};

interface MobileNavLinkProps {
	icon: React.ElementType;
	children: React.ReactNode;
	href?: string;
}

const MobileNavLink = (props: MobileNavLinkProps) => {
	const { icon, children, href } = props;
	return (
		<Flex
			as={Link}
			href={href}
			m="-3"
			p="3"
			align="center"
			rounded="md"
			cursor="pointer"
			_hover={{ bg: mode("gray.50", "gray.600"), textDecoration: "none" }}
		>
			<Icon as={icon} color={mode("brand.600", "brand.400")} fontSize="xl" />
			<Box marginStart="3" fontWeight="medium">
				{children}
			</Box>
		</Flex>
	);
};

MobileNavLink.defaultProps = {
	href: "/",
};

const NavLink = {
	Desktop: DesktopNavLink,
	Mobile: MobileNavLink,
};
export default NavLink;
