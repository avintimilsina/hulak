/* eslint-disable no-console */
import Search from "@/components/pages/admin/Search";
import { TableContent } from "@/components/pages/admin/UserTable";
import withAdminProtected from "@/routes/withAdminProtected";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	HStack,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalContent,
	ModalOverlay,
	Select,
	Stack,
	VStack,
	useDisclosure,
} from "@chakra-ui/react";
import { collection, doc, setDoc } from "firebase/firestore";
import { GetStaticPropsContext } from "next";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsSearch } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { db } from "../../../firebase";

// ? AdminPage is a page where the admin can view and manage all the admin profiles

const AdminPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	// useCollectionData hook from react-firebase-hooks is used to fetch all the users who have isAdmin set to true
	const [, adminLoading, adminError, snapshot] = useCollectionData(
		collection(db, "admins"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	if (adminLoading) {
		return <div>Loading...</div>;
	}

	if (adminError) {
		return <div>{adminError?.message}</div>;
	}

	return (
		<VStack>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<Search
						onChange={async (selected: any) => {
							await setDoc(doc(db, "admins", selected.value), {
								isActive: true,
							});
							onClose();
						}}
					/>
				</ModalContent>
			</Modal>

			<Box as="section" py="12" w="full">
				<Box
					maxW={{ base: "xl", md: "7xl" }}
					mx="auto"
					px={{ base: "6", md: "8" }}
				>
					<Box>
						<Stack
							spacing="4"
							direction={{ base: "column", md: "row" }}
							justify="space-between"
						>
							<HStack>
								<FormControl minW={{ md: "320px" }} id="search">
									<InputGroup size="sm">
										<FormLabel srOnly>Filter by name or email</FormLabel>
										<InputLeftElement pointerEvents="none" color="gray.400">
											<BsSearch />
										</InputLeftElement>
										<Input
											rounded="base"
											type="search"
											placeholder="Filter by name or email..."
										/>
									</InputGroup>
								</FormControl>
								<Select
									w={{ base: "300px", md: "unset" }}
									rounded="base"
									size="sm"
									placeholder="All roles"
								>
									<option>Admin</option>
									<option>Manager</option>
									<option>Logistics</option>
								</Select>
							</HStack>
							<Button
								size="sm"
								variant="solid"
								iconSpacing="1"
								colorScheme="brand"
								leftIcon={<RiAddFill fontSize="1.25em" />}
								onClick={onOpen}
							>
								New Admin
							</Button>
						</Stack>
						<Box overflowX="auto">
							<TableContent
								admins={snapshot?.docs.map((document) => ({
									id: document.id,
									...document.data(),
								}))}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</VStack>
	);
};

export default withAdminProtected(AdminPage);

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
