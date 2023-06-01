import type { LinkProps } from "@chakra-ui/react";
import {
	HStack,
	Icon,
	Link,
	useColorModeValue as mode,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

// ? NavLink component is used to display the links in the sidebar

interface NavLinkProps extends LinkProps {
	isActive?: boolean;
	href: string;
	label: string;
	icon: any;
}

const NavLink = (props: NavLinkProps) => {
	const { icon, isActive, label, href, ...rest } = props;
	return (
		<Link
			// Link from Chakra UI is used to display the links in the sidebar along with the icons and check if the link is active or not
			as={NextLink}
			href={href}
			display="block"
			py={2}
			px={3}
			borderRadius="md"
			transition="all 0.3s"
			fontWeight="medium"
			lineHeight="1.5rem"
			aria-current={isActive ? "page" : undefined}
			color={mode("blackAlpha.800", "whiteAlpha.800")}
			_hover={{
				bg: mode("brand.100", "brand.700"),
				color: mode("black", "white"),
			}}
			// if the link is active then the background color and text color is changed
			_activeLink={{
				bg: mode("brand.500", "brand.300"),
				color: mode("white", "black"),
			}}
			{...rest}
		>
			<HStack spacing={4}>
				<Icon as={icon} boxSize="20px" />
				<Text as="span">{label}</Text>
			</HStack>
		</Link>
	);
};

NavLink.defaultProps = {
	isActive: false,
};

export default NavLink;
