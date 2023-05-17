/* eslint-disable no-nested-ternary */
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { PriceTag } from "@/components/shared/PriceTag";
import Result from "@/components/shared/Result";
import { capitalize } from "@/utils/helpers";
import {
	Badge,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	HStack,
	Heading,
	Icon,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Tag,
	Text,
	Tooltip,
	VStack,
	useColorModeValue as mode,
	useClipboard,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import {
	DocumentData,
	collection,
	collectionGroup,
	query,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { auth, db } from "../../../firebase";

const OrdersPage = () => {
	const router = useRouter();
	const [currentUser] = useAuthState(auth);
	const [value, setValue] = useState<DocumentData | undefined>({});
	const [values, loading, error] = useCollectionData(
		query(
			collection(db, "orders"),
			where("userId", "==", currentUser?.uid ?? "-")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const [payment, paymentLoading, paymentError] = useCollectionData(
		query(
			collectionGroup(db, "payments"),
			where("orderId", "==", value?.orderId ?? "-")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const successPayment = payment?.filter(
		(singlePayment) => singlePayment.status === "COMPLETED"
	)[0];

	useEffect(() => {
		setValue(
			values?.filter((order) => order.orderId === router.query.id)[0] ?? {}
		);
	}, [router.query.id, values]);

	const { onCopy, hasCopied } = useClipboard("abcedf");

	if (loading) {
		return <PageLoadingSpinner />;
	}

	if (error || paymentError) {
		return (
			<Result
				heading={error ? error.name : paymentError?.name!}
				type="error"
				text={error ? error.message : paymentError?.message!}
				dump={error ? error.stack : paymentError?.stack!}
			/>
		);
	}

	if (!values) {
		return (
			<SimpleGrid w="full" h="94vh" placeItems="center">
				<VStack textAlign="center">
					<Heading as="h3" fontSize="2xl" lineHeight="1">
						Haven&apos;t ordered anything yet ?
					</Heading>
					<Text>This page is ready to be filled by your orders.</Text>
				</VStack>
			</SimpleGrid>
		);
	}

	return (
		<VStack gap={4} w="full">
			<HStack w="full" alignItems="flex-start" justifyContent="flex-start">
				<VStack
					display={{ base: "none", lg: "flex" }}
					minW="xs"
					h="94vh"
					overflowY="scroll"
					borderRightWidth="1px"
					py="4"
					pr="2"
				>
					{values?.map((order) => (
						<Card
							onClick={() => {
								setValue(
									values?.filter(
										(singleOrder) => singleOrder.orderId === router.query.id
									)[0] ?? {}
								);
								router.push({ query: { id: order.orderId } });
							}}
							key={order.pidx}
							w="full"
							_hover={{ textDecoration: "none" }}
							variant={
								router.query.id === order.orderId ? "filled" : "elevated"
							}
						>
							<CardHeader pb="1">
								<HStack justifyContent="space-between">
									<Text>
										{dayjs(Number(order.createdAt.seconds * 1000)).format(
											"DD MMMM, YYYY"
										)}
									</Text>

									<Tag colorScheme="green" px={2}>
										{order?.status?.toUpperCase()}
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
									<Text alignSelf="flex-start">
										{order.source.addressLine1}
									</Text>
									<HStack w="full" justifyContent="center">
										<Icon as={BsArrowReturnRight} />
										<Text alignSelf="flex-end">
											{order.destination.addressLine1}
										</Text>
									</HStack>
								</VStack>
							</CardBody>
							<CardFooter as={HStack} justifyContent="space-between" pt="1">
								{value?.status?.toUpperCase() === "COMPLETED"
									? "SUCCESSFUL"
									: "NOT INITIATED"}
								<Tag colorScheme="red" px={2}>
									UNPAID
								</Tag>
								<HStack>
									{order.isCarbonNeutral && (
										<Icon as={FaLeaf} fill="green.500" />
									)}
								</HStack>
							</CardFooter>
						</Card>
					))}
				</VStack>
				<Box
					flexGrow={1}
					borderWidth="2px"
					rounded="base"
					borderStyle="dashed"
					overflowY="scroll"
					w="full"
					h="94vh"
				>
					{paymentLoading ? (
						<PageLoadingSpinner />
					) : !value?.orderId ? (
						<SimpleGrid h="100%" placeItems="center">
							<VStack gap={4}>
								<Heading as="h3" fontSize="2xl" lineHeight="1">
									Select an order
								</Heading>
								<Text>
									Click on any order from the left to view its details.
								</Text>
							</VStack>
						</SimpleGrid>
					) : (
						<Stack
							as={Card}
							p={8}
							gap={8}
							alignItems="flex-start"
							justifyContent="space-between"
							maxW="3xl"
							w={{ base: "unset", lg: "3xl" }}
						>
							<VStack alignItems="flex-start" gap={6}>
								<VStack alignItems="flex-start" gap={2}>
									<HStack alignItems="flex-start">
										<Tooltip label="Payment Status" closeOnClick={false}>
											<Badge fontSize="xl" colorScheme="green" px={3} py={1}>
												PAYMENT {successPayment?.status?.toUpperCase()}
											</Badge>
										</Tooltip>
									</HStack>

									<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
										Your Order is{" "}
										<Tooltip label="Order Status" closeOnClick={false}>
											<Text as="span">
												{capitalize(
													value?.status?.toUpperCase() === "INITIATED"
														? "PLACED"
														: "NOT YET CONFIRMED"
												)}{" "}
											</Text>
										</Tooltip>
									</Heading>
								</VStack>
							</VStack>
							<Box>
								<Text>Hi {currentUser?.displayName},</Text>
								<Text>
									Your order has been confirmed and will be shipping soon.
								</Text>
							</Box>
							<VStack alignItems="flex-start">
								<HStack>
									<Text fontSize="lg" fontWeight="semibold">
										Tracking Number
									</Text>
									<Tooltip
										label={hasCopied ? "Copied!" : "Copy"}
										closeOnClick={false}
									>
										<IconButton
											aria-label="Copy Tracking Number"
											variant="ghost"
											icon={<MdOutlineContentCopy size={20} />}
											onClick={onCopy}
										/>
									</Tooltip>
								</HStack>
								<Text>{value?.orderId}</Text>
							</VStack>
							<HStack gap={6}>
								<OrderInfo label="Order Date">
									<Text>
										{dayjs(Number(value?.createdAt?.seconds ?? 0)).format(
											"DD MMMM, YYYY"
										)}
									</Text>
								</OrderInfo>
								<OrderInfo label="Payment">
									<Text>Khalti</Text>
								</OrderInfo>
								<OrderInfo label="Address">
									<Text>Sinamangal</Text>
								</OrderInfo>
							</HStack>

							<VStack w="full" px={{ base: 2, lg: 8 }} gap={2} py={4}>
								<HStack justify="space-between" w="full" fontSize="lg">
									<Text color={mode("gray.600", "gray.400")}>Sub Total</Text>
									<PriceTag price={123} currency="NPR" />
								</HStack>
								<HStack justify="space-between" w="full" fontSize="lg">
									<Text color={mode("gray.600", "gray.400")}>
										Shipping Cost
									</Text>
									<HStack>
										<Text>+</Text>
										<PriceTag price={200} currency="NPR" />
									</HStack>
								</HStack>
								<Divider />

								<HStack
									justify="space-between"
									w="full"
									fontWeight="bold"
									fontSize="xl"
								>
									<Text color={mode("gray.500", "gray.300")}>Order Total</Text>
									<PriceTag price={456} currency="NPR" />
								</HStack>
							</VStack>
							<Box>
								<Text>
									We&apos;ll send you shipping confirmation when your item(s)
									are on the way! We appreciate your business, and hope you
									enjoy your purchase.
								</Text>
							</Box>
							<Box>
								<Text>Thank you,</Text>
								<Text>Hulak Team</Text>
							</Box>
							<Text w="full" fontSize="lg">
								Have a Problem? Contact our{" "}
								<Link href="/">Customer Support </Link>
							</Text>
						</Stack>
					)}
				</Box>
			</HStack>
		</VStack>
	);
};

export default OrdersPage;

export const OrderInfo = ({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) => (
	<VStack alignItems="flex-start">
		<Text fontSize="lg" fontWeight="semibold">
			{label}
		</Text>
		<Text>{children}</Text>
	</VStack>
);
