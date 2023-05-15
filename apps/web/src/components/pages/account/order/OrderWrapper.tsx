import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import { Link } from "@chakra-ui/next-js";
import {
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	HStack,
	Icon,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { collection } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { db } from "../../../../../firebase";

const OrderWrapper = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
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
	return (
		<HStack alignItems="flex-start" justifyContent="flex-start">
			<VStack
				display={{ base: "none", lg: "flex" }}
				width="full"
				h="100vh"
				overflowY="scroll"
				borderRightWidth="1px"
				py="4"
				pr="2"
			>
				{values?.map((order) => (
					<Card
						as={Link}
						href={`/account/order/${order.pidx}`}
						key={order.pidx}
						w="full"
						_hover={{ textDecoration: "none" }}
						variant={router.query.id === order.pidx ? "filled" : "elevated"}
					>
						<CardHeader pb="1">
							<HStack justifyContent="space-between">
								<Text>
									{dayjs(Number(order.createdAt.seconds * 1000)).format(
										"DD MMMM, YYYY"
									)}
								</Text>
								<Tag colorScheme="green" px={2}>
									OUT FOR DELIVERY
								</Tag>
							</HStack>
						</CardHeader>
						<CardBody
							pt="1"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							alignItems="flex-start"
							gap={2}
						>
							<VStack w="full">
								<Text alignSelf="flex-start">{order.source.addressLine1}</Text>
								<HStack w="full" justifyContent="center">
									<Icon as={BsArrowReturnRight} />
									<Text alignSelf="flex-end">
										{order.destination.addressLine1}
									</Text>
								</HStack>
							</VStack>
						</CardBody>
						<CardFooter as={HStack} justifyContent="space-between" pt="1">
							<Tag colorScheme="red" px={2}>
								UNPAID
							</Tag>
							<HStack>
								{order.isCarbonNeutral && <Icon as={FaLeaf} fill="green.500" />}
							</HStack>
						</CardFooter>
					</Card>
				))}
			</VStack>
			<Flex flex="1" p="6">
				<Box
					borderWidth="2px"
					rounded="base"
					borderStyle="dashed"
					h="full"
					w="full"
				>
					{children}
				</Box>
			</Flex>
		</HStack>
	);
};

export default OrderWrapper;
