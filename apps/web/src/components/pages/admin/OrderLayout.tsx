/* eslint-disable no-nested-ternary */
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { PriceTag } from "@/components/shared/PriceTag";
import Result from "@/components/shared/Result";
import {
	Badge,
	Box,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	HStack,
	Heading,
	Icon,
	IconButton,
	SimpleGrid,
	Spinner,
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
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsArrowReturnRight } from "react-icons/bs";
import {
	FaBoxOpen,
	FaHandHoldingHeart,
	FaLeaf,
	FaSignature,
	FaSnowflake,
} from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { db } from "../../../../firebase";
import OrderActions from "./OrderActions";

interface OrderLayoutProps {
	status: string;
}
const OrderLayout = ({ status }: OrderLayoutProps) => {
	const router = useRouter();
	const [value, setValue] = useState<DocumentData | undefined>({});
	const [values, loading, error] = useCollectionData(
		query(
			collection(db, "orders"),
			where("status", "==", status),
			orderBy("createdAt", "desc")
		),

		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const [payment, paymentLoading, paymentError] = useCollectionData(
		query(
			collectionGroup(db, "payments"),
			where("orderId", "==", value?.orderId ?? "-"),
			orderBy("createdAt", "desc")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const successPayment = payment?.filter(
		(singlePayment) => singlePayment.status === "COMPLETED"
	)[0];

	const latestPayment = successPayment ?? payment?.[0];

	useEffect(() => {
		setValue(
			values?.filter((order) => order.orderId === router.query.id)[0] ?? {}
		);
	}, [router.query.id, values]);

	const { onCopy, hasCopied } = useClipboard(value?.orderId ?? "");

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
						<OrderList order={order} values={values} setValue={setValue} />
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
							w={{ base: "unset", lg: "full" }}
						>
							<VStack alignItems="flex-start" gap={6}>
								<VStack alignItems="flex-start" gap={2}>
									<HStack alignItems="flex-start">
										<Tooltip label="Payment Status" closeOnClick={false}>
											<Badge
												fontSize="xl"
												colorScheme={getColorFromStatus(
													latestPayment?.status ?? "PENDING"
												)}
												px={3}
												py={1}
											>
												PAYMENT {latestPayment?.status?.toUpperCase()}
											</Badge>
										</Tooltip>
										<Tooltip label="Order Status" closeOnClick={false}>
											<Badge
												fontSize="xl"
												colorScheme={getColorFromStatus(
													value?.status ?? "PENDING"
												)}
												px={3}
												py={1}
											>
												ORDER{" "}
												{
													orderPageTextFromStatus(value?.status?.toUpperCase())
														.info
												}
											</Badge>
										</Tooltip>
									</HStack>
								</VStack>
							</VStack>
							<VStack>
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
							<HStack
								justifyContent="space-between"
								w="full"
								alignItems="flex-start"
							>
								<OrderInfo label="Delivering From">
									<Text>
										{value?.source.addressLine1}, {value?.source.addressLine2}
									</Text>
									<Text>
										{value?.source.city},{value?.source.state}
									</Text>
									<Text>
										{value?.source.zip},{value?.source.country}
									</Text>
								</OrderInfo>
								<OrderInfo label="Delivering To">
									<Text>
										{value?.destination.addressLine1},{" "}
										{value?.destination.addressLine2}
									</Text>
									<Text>
										{value?.destination.city},{value?.destination.state}
									</Text>
									<Text>
										{value?.destination.zip},{value?.destination.country}
									</Text>
								</OrderInfo>
							</HStack>
							<HStack
								justify="space-between"
								w="full"
								fontWeight="bold"
								fontSize="xl"
							>
								<Text color={mode("gray.500", "gray.300")}>Order Total</Text>
								<PriceTag price={value?.price ?? 0} currency="NPR" />
							</HStack>
							<OrderActions status={status} orderId={value?.orderId} />
						</Stack>
					)}
				</Box>
			</HStack>
		</VStack>
	);
};

export default OrderLayout;

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

export const orderPageTextFromStatus = (status: string) => {
	switch (status) {
		case "PICKED":
			return {
				info: "Picked Up",
				header:
					"Your order has been picked! We'll send you shipping confirmation once your order is on the way! ",
				footer:
					"We appreciate your business, and hope you enjoy your purchase.",
			};
		case "SHIPPED":
			return {
				info: "Shipped",
				header:
					"Your order has been shipped! We'll send you shipping confirmation once your order is on the way! ",
				footer:
					"We appreciate your business, and hope you enjoy your purchase.",
			};
		case "PLACED":
			return {
				info: "Placed",
				header: "Your order has been placed!",
				footer:
					"We'll send you shipping confirmation once your order is on the way! We appreciate your business, and hope you enjoy your purchase.",
			};
		case "OUTFORDELIVERY":
			return {
				info: "Out for delivery",
				header: "Your order is out for delivery!",
				footer:
					"We appreciate your business, and hope you enjoy your purchase.",
			};
		case "DELIVERED":
			return {
				info: "Delivered",
				header: "Your order has been delivered!",
				footer:
					"Do checkout our other products and dont forget to leave a review.",
			};
		case "RETURNED":
			return {
				info: "Rejected",
				header: "Your order has been rejected!",
				footer: "Please contact our support team for further details.",
			};
		case "COMPLETED":
			return {
				info: "Completed",
				header: "Your order is complete!",
				footer: "Thank you for using our service.",
			};
		default:
			return {
				info: "Not Available",
				header: "Something went wrong!",
				footer: "Please contact our suppport team as soon as possible.",
			};
	}
};

export const getColorFromStatus = (status: string) => {
	switch (status.toUpperCase()) {
		case "PENDING":
			return "red";
		case "PICKED":
			return "blue";
		case "INITIATED":
			return "yellow";
		case "COMPLETED":
			return "green";
		case "PLACED":
			return "blue";
		case "SHIPPED":
			return "blue";
		case "OUTFORDELIVERY":
			return "green";
		case "DELIVERED":
			return "green";
		case "REFUNDED":
			return "green";
		case "RETURNED":
			return "red";
		case "FAILED":
			return "red";
		case "EXPIRED":
			return "red";
		default:
			return "gray";
	}
};

interface OrderListProps {
	order: any;
	setValue: Dispatch<SetStateAction<DocumentData | undefined>>;
	values: DocumentData[] | undefined;
}
const OrderList = ({ order, setValue, values }: OrderListProps) => {
	const router = useRouter();

	const [payment, paymentLoading, paymentError] = useCollectionData(
		query(
			collectionGroup(db, "payments"),
			where("orderId", "==", order?.orderId ?? "-"),
			orderBy("createdAt", "desc")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	if (paymentLoading) {
		return <Spinner />;
	}

	if (paymentError) {
		return (
			<Result
				heading={paymentError?.name!}
				type="error"
				text={paymentError?.message!}
				dump={paymentError?.stack!}
			/>
		);
	}
	const successPayment = payment?.filter(
		(singlePayment) => singlePayment.status === "COMPLETED"
	)[0];

	const latestPayment = successPayment ?? payment?.[0];
	return (
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
			variant={router.query.id === order.orderId ? "filled" : "elevated"}
		>
			<CardHeader pb="1">
				<HStack justifyContent="space-between">
					<Text>
						{dayjs(Number(order.createdAt.seconds * 1000)).format(
							"DD MMMM, YYYY"
						)}
					</Text>

					<Tag
						colorScheme={getColorFromStatus(order?.status ?? "PENDING")}
						px={2}
					>
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
					<Text alignSelf="flex-start">{order.source.addressLine1}</Text>
					<HStack w="full" justifyContent="center">
						<Icon as={BsArrowReturnRight} />
						<Text alignSelf="flex-end">{order.destination.addressLine1}</Text>
					</HStack>
				</VStack>
			</CardBody>
			<CardFooter as={HStack} justifyContent="space-between" pt="1">
				<Tag
					colorScheme={getColorFromStatus(latestPayment?.status ?? "PENDING")}
					px={2}
				>
					$ {latestPayment?.status?.toUpperCase() ?? "PENDING"}
				</Tag>
				<HStack>
					{order.isCarbonNeutral && <Icon as={FaLeaf} fill="green.500" />}
					{order.isLithiumIncluded && (
						<Icon as={IoMdBatteryCharging} fill="red.500" />
					)}
					{order.isSignatureIncluded && <Icon as={FaSignature} />}
					{order.isDryIceIncluded && <Icon as={FaSnowflake} fill="blue.500" />}
					{order.deliverOnlyToReceiver && (
						<Icon as={FaHandHoldingHeart} fill="yellow.500" />
					)}
					{order.isOversizedPackageIncluded && (
						<Icon as={FaBoxOpen} fill="brown" />
					)}
				</HStack>
			</CardFooter>
		</Card>
	);
};
