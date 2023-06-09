/* eslint-disable no-nested-ternary */
import {
	Badge,
	Box,
	Heading,
	Skeleton,
	SkeletonCircle,
	Stack,
	StackDivider,
	Text,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import {
	DocumentData,
	FirestoreDataConverter,
	QueryDocumentSnapshot,
	SnapshotOptions,
	collectionGroup,
	deleteDoc,
	doc,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { RiDeleteBin2Line } from "react-icons/ri";
import { auth, db } from "../../../../../firebase";
import ConfirmationModal from "../../../helpers/ConfirmationModal";
import ModalButton from "../../../ui/ModalButton";
import AddressForm from "./AddressForm";

// ? AddressSection is a component where it fetches the list of addresses of the user

// Converter function is little tricky to understand. It is used to convert the data from firestore to the data that we want to use in our app as well as add new data like in this case we are adding id to the data that we get from firestore to recognize and associate the data with the component easily.
const addressConverter: FirestoreDataConverter<AddressProps["address"]> = {
	toFirestore(): DocumentData {
		return {};
	},
	fromFirestore(
		snapshot: QueryDocumentSnapshot,
		options: SnapshotOptions
	): AddressProps["address"] {
		const data = snapshot.data(options);
		return {
			// id is added to the data that we get from firestore
			id: snapshot.id,
			name: data.name,
			type: data.type,
			address: data.address,
			city: data.city,
			state: data.state,
			zip: data.zip,
			country: data.country,
			phone_number: data.phone_number,
			userId: data.userId,
			isDefault: data.isDefault,
		};
	},
};
const AddressSection = () => {
	const [currentUser] = useAuthState(auth);

	// useCollectionData is a hook from react-firebase-hooks/firestore that allows us to fetch all the data present in the collection "addresses" where the userId is equal to the current user's id and order the data by createdAt in descending order.
	const [values, loading, error] = useCollectionData(
		query(
			collectionGroup(db, "addresses").withConverter(addressConverter),
			where("userId", "==", currentUser?.uid ?? "-"),
			orderBy("createdAt", "desc")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	if (error) return <div>Error: {error.message}</div>;

	return (
		<Box mx="auto">
			<Box
				rounded="lg"
				bg={mode("white", "gray.700")}
				shadow="base"
				overflow="hidden"
			>
				<Stack spacing="6" divider={<StackDivider />} py="5" px="8">
					{/* AddressSkeleton is a component where it displays the skeleton of the address component */}
					{loading ? (
						Array(3)
							.fill("address")
							.map((address, index) => (
								<AddressSkeleton key={`${address}-${index + 1}`} />
							))
					) : !values?.length ? (
						// If there are no addresses then it displays this message
						<Box textAlign="center" py={8}>
							<Heading as="h3" fontSize="2xl" lineHeight="1">
								No Address Found
							</Heading>
							<Text>You dont have any addresses yet.</Text>
						</Box>
					) : (
						// If there are addresses then it displays the list of addresses
						values?.map((address) => (
							<Address key={address.id} address={address} />
						))
					)}
				</Stack>
			</Box>
		</Box>
	);
};

export default AddressSection;

// ? Address is a component where it displays the address of the user
interface AddressProps {
	address: {
		id: string;
		name: string;
		type: string;
		isDefault: boolean;
		address: string;
		city: string;
		state: string;
		zip: string;
		country: string;
		phone_number: string;
		userId: string;
	};
}

export const Address = ({ address }: AddressProps) => {
	const [currentUser] = useAuthState(auth);
	const modalRef: any = useRef();

	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
		// This component displays the address of the user using the data that we get from firestore like address.name give the name of the address, address.city gives the city of the user and so on.
		<Stack
			direction={{ base: "column", sm: "row" }}
			spacing="5"
			justify="space-between"
			pos="relative"
		>
			<Stack
				direction={{ base: "column", sm: "row" }}
				spacing="4"
				align="flex-start"
				flex="1"
			>
				<Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
					{address.type === "home" ? <FaHome /> : <MdWorkOutline />}
				</Box>
				<Box flex="1">
					<Box as="h4" fontWeight="bold" fontSize="xl" maxW="xl">
						<span>{address.name}</span>{" "}
						{address.isDefault && <Badge marginStart="1">Default</Badge>}
					</Box>
					<Box
						maxW={{ base: "xs", md: "unset" }}
						color={mode("gray.600", "gray.400")}
						fontSize="md"
					>
						{address.address}, {address.city}
						<br />
						{address.state} {address.zip}, {address.country}
					</Box>
					<Box
						color={mode("gray.600", "gray.400")}
						fontSize="lg"
						fontWeight="semibold"
					>
						{address.phone_number && `Phone: ${address.phone_number}`}
					</Box>
				</Box>
			</Stack>
			<Stack
				direction={{ base: "row", md: "column" }}
				justifyContent={{ base: "flex-start", md: "center" }}
			>
				<ModalButton
					ref={modalRef}
					variant="outline"
					leftIcon={<FiEdit />}
					buttonText="Edit"
					modalHeader="Edit Address"
					modalFooter=""
				>
					<AddressForm
						onSubmissionSuccess={closeModal}
						id={address.id}
						defaultValues={address}
					/>
				</ModalButton>
				{/* ConfirmationModal to delete the address if the user confirms the action */}
				<ConfirmationModal
					colorScheme="red"
					leftIcon={<RiDeleteBin2Line />}
					onSuccess={async () => {
						await deleteDoc(
							doc(db, "users", currentUser?.uid ?? "-", "addresses", address.id)
						);
					}}
					bodyText="Are you sure you want to delete this address?"
					headerText="Delete Address?"
				>
					Delete
				</ConfirmationModal>
			</Stack>
		</Stack>
	);
};

// ? AddressSkeleton is a component where it displays the skeleton of the address component(Loading Component)
export const AddressSkeleton = () => (
	<Stack
		direction={{ base: "column", sm: "row" }}
		spacing="5"
		justify="space-between"
		pos="relative"
	>
		<Stack
			direction={{ base: "column", sm: "row" }}
			spacing="4"
			align="flex-start"
			flex="1"
		>
			<Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
				<SkeletonCircle size="10" />
			</Box>
			<Box flex="1">
				<Box as={Skeleton} fontWeight="bold" fontSize="xl" maxW="xs">
					Hello World
				</Box>
				<Box
					maxW={{ base: "xs", md: "unset" }}
					color={mode("gray.600", "gray.400")}
					fontSize="md"
				>
					<Skeleton as="span">House no 6 Surya Colony, Lalipur</Skeleton>
					<br />
					<Skeleton as="span">Bagmati 123123, Nepal</Skeleton>
				</Box>
				<Box
					color={mode("gray.600", "gray.400")}
					fontSize="lg"
					fontWeight="semibold"
				>
					<Skeleton maxW="xs" height="20px" />
				</Box>
			</Box>
		</Stack>
		<Stack
			direction={{ base: "row", md: "column" }}
			justifyContent={{ base: "flex-start", md: "center" }}
		>
			<Skeleton width="100px" height="40px" />
			<Skeleton width="100px" height="40px" />
		</Stack>
	</Stack>
);
