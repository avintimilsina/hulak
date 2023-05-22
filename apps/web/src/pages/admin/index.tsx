/* eslint-disable no-console */
import Search from "@/components/pages/admin/Search";
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
import { useCollectionData } from "react-firebase-hooks/firestore";
import { TableContent } from "@/components/pages/admin/UserTable";
import { BsSearch } from "react-icons/bs";
import { RiAddFill } from "react-icons/ri";
import { db } from "../../../firebase";

const AdminPage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
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
			<h1>Admin Page</h1>

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

			<Box as="section" py="12">
				<Box
					maxW={{ base: "xl", md: "7xl" }}
					mx="auto"
					px={{ base: "6", md: "8" }}
				>
					<Box overflowX="auto">
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
									<option>All roles</option>
									<option>UI Designers</option>
									<option>Marketing Directors</option>
								</Select>
							</HStack>
							<Button
								size="sm"
								variant="outline"
								iconSpacing="1"
								leftIcon={<RiAddFill fontSize="1.25em" />}
								onClick={onOpen}
							>
								New Admin
							</Button>
						</Stack>
						<TableContent
							admins={snapshot?.docs.map((document) => ({
								id: document.id,
								...document.data(),
							}))}
						/>
					</Box>
				</Box>
			</Box>
		</VStack>
	);
};

export default withAdminProtected(AdminPage);
