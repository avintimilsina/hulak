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
import AdminSidebar from "./AdminSidebar";

// ? AdminSidebarWrapper component is used to display the sidebar in the admin dashboard.
// It is render of the URL of the page starts with /admin unlike the user sidebarWrapper which is rendered if the URL starts with /account
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
			<Logo height="8" />
		</HStack>
	</HStack>
);
