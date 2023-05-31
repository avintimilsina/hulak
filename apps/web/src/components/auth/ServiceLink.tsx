import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { GoogleAuthProvider, User, linkWithPopup, unlink } from "firebase/auth";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconType } from "react-icons";
import { TbUnlink } from "react-icons/tb";
import { auth } from "../../../firebase";

// ? ServiceLink is a component where it allows the user to link their google account to their account

// ServiceLinkProps is a type where it defines the props of the ServiceLink component
interface ServiceLinkProps {
	providerId: string;
	serviceProvider: GoogleAuthProvider;
	serviceIcon: IconType;
	serviceName: string;
}

const ServiceLink = ({
	providerId,
	serviceProvider,
	serviceIcon,
	serviceName,
}: ServiceLinkProps) => {
	const [currentUser] = useAuthState(auth);
	const router = useRouter();

	// filterProvider is a function where it filters the provider data of the current user where it shows whether the user is connected to the service or not
	const filterProvider = (
		service: string,
		providerData: User["providerData"]
	) => {
		const filtered = providerData.filter(
			(provider) => provider.providerId === service
		);
		return filtered.length > 0 ? filtered[0] : null;
	};
	const Icon = serviceIcon ?? TbUnlink;
	if (filterProvider(providerId, currentUser?.providerData ?? []) === null) {
		return (
			<Button
				variant="outline"
				leftIcon={<Icon />}
				onClick={() => {
					linkWithPopup(currentUser!, serviceProvider);
				}}
			>
				Connect {serviceName}
			</Button>
		);
	}

	return (
		<Menu>
			<MenuButton
				as={Button}
				variant="solid"
				colorScheme="green"
				leftIcon={<Icon />}
			>
				Connencted as{" "}
				{
					filterProvider(
						providerId,
						currentUser?.providerData ?? []
					)?.displayName?.split(" ")[0]
				}
			</MenuButton>
			{/* Opens a menu where it allows the user to unlink their google account from their account */}
			<MenuList
				p="0"
				m="0"
				minW="0"
				w="200px"
				borderColor="red.500"
				textColor="red.500"
			>
				<MenuItem
					as={Button}
					p="0"
					leftIcon={<TbUnlink />}
					colorScheme="red"
					variant="ghost"
					onClick={async () => {
						await unlink(currentUser!, providerId);
						router.reload();
					}}
				>
					Unlink
				</MenuItem>
			</MenuList>
		</Menu>
	);
};
export default ServiceLink;
