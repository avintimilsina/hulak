import {
	Box,
	Drawer,
	DrawerContent,
	HStack,
	IconButton,
	useDisclosure,
} from "@chakra-ui/react";

import type { ReactNode } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import AdminSidebar from "./AdminSidebar";
import Logo from "./Logo";

interface SidebarWrapperProps {
	children?: ReactNode;
}

const AdminSidebarWrapper = ({ children }: SidebarWrapperProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<HStack minH="100vh" alignItems="flex-start">
			<AdminSidebar
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
				<DrawerContent>
					<AdminSidebar onClose={onClose} />
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

AdminSidebarWrapper.defaultProps = {
	children: null,
};

export default AdminSidebarWrapper;

interface MobileNavProps {
	onOpen: () => void;
}

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
			<Logo iconColor="blue.500" h="8" />
		</HStack>
	</HStack>
);
