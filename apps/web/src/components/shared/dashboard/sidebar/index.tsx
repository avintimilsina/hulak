import {
	Box,
	Drawer,
	DrawerContent,
	HStack,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";

import Logo from "@/components/logo";
import type { ReactNode } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Sidebar from "./Sidebar";

// ? SidebarWrapper component is used to wrap the sidebar component and the content of the page

interface SidebarWrapperProps {
	children?: ReactNode;
}

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
	// useDisclosure hook from Chakra UI is used to handle the state of the sidebar while opening and closing in mobile devices for modal actions
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<HStack minH="100vh" alignItems="flex-start">
			<Sidebar
				position="fixed"
				top={0}
				onClose={() => onClose}
				display={{ base: "none", md: "flex" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
			>
				{/* DrawerContent component from Chakra UI is used to display the content of the sidebar in mobile devices */}
				<DrawerContent>
					<Sidebar onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<Box w="full" flexGrow={1}>
				<MobileNav onOpen={onOpen} />
				<Box ml={{ base: 0, md: 80 }} p={4}>
					{children}
				</Box>
			</Box>
		</HStack>
	);
};

SidebarWrapper.defaultProps = {
	children: null,
};

export default SidebarWrapper;

interface MobileNavProps {
	onOpen: () => void;
}

// ? MobileNav component is used to display the mobile navigation bar
const MobileNav = ({ onOpen }: MobileNavProps) => (
	<HStack m={4} display={{ base: "flex", md: "none" }}>
		<IconButton
			justifySelf="flex-start"
			aria-label="Open menu"
			icon={<AiOutlineMenu size={24} />}
			onClick={onOpen}
			variant="ghost"
		/>
		<HStack w="full" justifyContent="center">
			<Logo height="8" />
		</HStack>
	</HStack>
);
