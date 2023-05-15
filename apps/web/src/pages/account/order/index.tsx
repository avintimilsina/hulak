import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import {
	Box,
	Flex,
	Heading,
	SimpleGrid,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { collection } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../../firebase";

const OrdersPage = () => {
	const [values, loading, error] = useCollectionData(collection(db, "orders"), {
		snapshotListenOptions: { includeMetadataChanges: true },
	});

	if (loading) {
		return <PageLoadingSpinner />;
	}

	if (error) {
		return (
			<Result
				heading={error.name}
				type="error"
				text={error.message}
				dump={error.stack}
			/>
		);
	}

	if (!values) {
		return (
			<SimpleGrid h="90vh" placeItems="center">
				<VStack w="full" gap={4}>
					<VStack textAlign="center">
						<Heading as="h3" fontSize="2xl" lineHeight="1">
							Haven&apos;t ordered anything yet ?
						</Heading>
						<Text>This page is ready to be filled by your orders.</Text>
					</VStack>
				</VStack>
			</SimpleGrid>
		);
	}

	return (
		<Stack gap={4}>
			<Heading>Orders</Heading>
			<VStack gap={4} w="full">
				<Flex
					display={{ base: "none", lg: "block" }}
					width="96"
					direction="column"
					overflowY="auto"
					borderRightWidth="1px"
					p="6"
				>
					{values?.map((order) => (
						<Text>{order.pidx}</Text>

						// <OrderCard orderItem={order} key={order.pidx} />
					))}
				</Flex>
				<Flex flex="1" p="6">
					<Box
						borderWidth="2px"
						rounded="base"
						borderStyle="dashed"
						h="full"
						w="full"
					/>
				</Flex>
			</VStack>
		</Stack>
	);
};

export default OrdersPage;
