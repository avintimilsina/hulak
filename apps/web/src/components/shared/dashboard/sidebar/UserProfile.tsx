import {
	Avatar,
	Button,
	Flex,
	HStack,
	Skeleton,
	Text,
	VStack,
	useToast,
} from "@chakra-ui/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../../../../firebase";

const UserProfile = () => {
	const toast = useToast();
	const [currentUser, userLoading, userError] = useAuthState(auth);
	const [signOut, , error] = useSignOut(auth);

	if (error || userError) return <p>Error: {error?.message}</p>;

	return (
		<VStack gap={4}>
			{userLoading ? (
				<UserProfileSkeleton />
			) : (
				<>
					<HStack spacing="4" px="2" w="full">
						<Avatar
							name="Avin Timilsina"
							src={
								currentUser?.photoURL ??
								`https://api.dicebear.com/6.x/micah/svg?size=256&seed=${currentUser?.displayName}`
							}
						/>
						<Flex direction="column">
							<Text fontWeight="medium">{currentUser?.displayName}</Text>
							<Text fontSize="sm" lineHeight="shorter">
								{currentUser?.email}
							</Text>
						</Flex>
					</HStack>
					<Button
						w="full"
						colorScheme="red"
						onClick={async () => {
							const success = await signOut();
							if (success) {
								toast({
									title: "Logged out",
									description: "You have been logged out.",
									status: "success",
									isClosable: true,
								});
							}
						}}
					>
						Logout
					</Button>
				</>
			)}
		</VStack>
	);
};

export default UserProfile;

const UserProfileSkeleton = () => (
	<>
		<HStack spacing="4" px="2" w="full">
			<Skeleton>
				<Avatar
					name="Avin Timilsina"
					src="https://api.dicebear.com/6.x/micah/svg?size=256&seed=avintimilsina"
				/>
			</Skeleton>
			<Flex direction="column">
				<Skeleton>
					<Text fontWeight="medium">Avin Timilsina</Text>
				</Skeleton>
				<Skeleton>
					<Text fontSize="sm" lineHeight="shorter">
						avin.timilsina.16@gmail.com
					</Text>
				</Skeleton>
			</Flex>
		</HStack>
		<Skeleton w="full">
			<Button>Logout</Button>
		</Skeleton>
	</>
);
