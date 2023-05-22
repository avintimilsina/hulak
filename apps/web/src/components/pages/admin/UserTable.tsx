import Result from "@/components/shared/Result";
import {
	Box,
	Stack,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useColorModeValue as mode,
	Img,
	Badge,
	Button,
	SkeletonCircle,
	Skeleton,
	VStack,
} from "@chakra-ui/react";

import {
	collection,
	deleteDoc,
	doc,
	documentId,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import { db } from "../../../../firebase";

const badgeEnum: Record<string, string> = {
	active: "green",
	reviewing: "orange",
	revoked: "red",
};

interface TableContentProps {
	admins: any;
}

export const TableContent = ({ admins }: TableContentProps) => {
	const [data, loading, error] = useCollectionData(
		query(
			collection(db, "users"),
			where(documentId(), "in", admins.map((admin: any) => admin.id) ?? ["-"])
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	if (loading) {
		return (
			<Table my="8" borderWidth="1px" fontSize="sm">
				<Thead bg={mode("gray.50", "gray.800")}>
					<Tr>
						{["Member", "Role", "Status", ""].map((column, index) => (
							<Th
								whiteSpace="nowrap"
								scope="col"
								key={`column-header-${index + 1}`}
							>
								{column}
							</Th>
						))}
						<Th />
					</Tr>
				</Thead>
				<Tbody>
					{Array(5)
						.fill("mock")
						?.map((admin) => (
							<Tr key={admin.uid}>
								<Td whiteSpace="nowrap" key={admin.uid}>
									<Stack direction="row" spacing="4" align="center">
										<Box flexShrink={0} h="10" w="10">
											<SkeletonCircle size="10" />
										</Box>
										<VStack w="full" minW="28" alignItems="flex-start">
											<Skeleton w="full">Name</Skeleton>
											<Skeleton w="full">Email</Skeleton>
										</VStack>
									</Stack>
								</Td>
								<Td whiteSpace="nowrap" key={admin.uid}>
									<Skeleton>Name</Skeleton>
								</Td>
								<Td whiteSpace="nowrap" key={admin.uid}>
									<Skeleton>Name</Skeleton>
								</Td>

								<Td textAlign="right">
									<Button variant="link" colorScheme="red">
										Revoke
									</Button>
								</Td>

								<Td textAlign="right">
									<Button variant="link" colorScheme="red">
										Remove
									</Button>
								</Td>
							</Tr>
						))}
				</Tbody>
			</Table>
		);
	}

	if (error) {
		return (
			<Result
				type="error"
				heading={error.name}
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	return (
		<Table my="8" borderWidth="1px" fontSize="sm">
			<Thead bg={mode("gray.50", "gray.800")}>
				<Tr>
					{["Member", "Role", "Status", ""].map((column, index) => (
						<Th
							whiteSpace="nowrap"
							scope="col"
							key={`column-header-${index + 1}`}
						>
							{column}
						</Th>
					))}
					<Th />
				</Tr>
			</Thead>
			<Tbody>
				{data?.map((admin) => {
					const isActive = admins.find(
						(a: any) => a.id === admin.uid
					)?.isActive;
					return (
						<Tr key={admin.uid}>
							<Td whiteSpace="nowrap" key={admin.uid}>
								<User
									data={{
										photoURL: admin.photoURL,
										displayName: admin.displayName,
										email: admin.email,
									}}
								/>
							</Td>
							<Td whiteSpace="nowrap" key={admin.uid}>
								Admin
							</Td>
							<Td whiteSpace="nowrap" key={admin.uid}>
								<Badge
									fontSize="xs"
									colorScheme={badgeEnum[isActive ? "active" : "revoked"]}
								>
									{isActive ? "Active" : "Inactive"}
								</Badge>
							</Td>

							{isActive ? (
								<Td textAlign="right">
									<ConfirmationModal
										headerText="Revoke admin?"
										bodyText="Are you sure you want to revoke admin privileges?"
										onSuccess={async () => {
											await setDoc(doc(db, "admins", admin.uid), {
												isActive: false,
											});
										}}
										variant="link"
										colorScheme="red"
									>
										Revoke
									</ConfirmationModal>
								</Td>
							) : (
								<Td textAlign="right">
									<Button
										variant="link"
										colorScheme="green"
										onClick={async () => {
											await setDoc(doc(db, "admins", admin.uid), {
												isActive: true,
											});
										}}
									>
										Enable
									</Button>
								</Td>
							)}

							<Td textAlign="right">
								<ConfirmationModal
									headerText="Remove admin?"
									bodyText="Are you sure you want to revoke admin privileges?"
									confirmText="remove"
									onSuccess={async () => {
										await deleteDoc(doc(db, "admins", admin.uid));
									}}
									variant="link"
									colorScheme="red"
								>
									Remove
								</ConfirmationModal>
							</Td>
						</Tr>
					);
				})}
			</Tbody>
		</Table>
	);
};

interface UserProps {
	data: {
		photoURL: string;
		displayName: string;
		email: string;
	};
}

export const User = (props: UserProps) => {
	const {
		data: { photoURL: image, displayName: name, email },
	} = props;
	return (
		<Stack direction="row" spacing="4" align="center">
			<Box flexShrink={0} h="10" w="10">
				<Img
					objectFit="cover"
					htmlWidth="160px"
					htmlHeight="160px"
					w="10"
					h="10"
					rounded="full"
					src={image}
					alt=""
				/>
			</Box>
			<Box>
				<Box fontSize="sm" fontWeight="medium">
					{name}
				</Box>
				<Box fontSize="sm" color="gray.500">
					{email}
				</Box>
			</Box>
		</Stack>
	);
};
