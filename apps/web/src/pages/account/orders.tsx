/* eslint-disable no-nested-ternary */
import { PriceTag } from "@/components/shared/PriceTag";
import Result from "@/components/shared/Result";
import OrderInfoSkeleton from "@/components/ui/skeleton/OrderInfoSkeleton";
import OrderListSkeleton from "@/components/ui/skeleton/OrderListSkeleton";
import withProtected from "@/routes/withProtected";
import {
	Badge,
	Box,
	Card,
	CardBody,
	CardHeader,
	Divider,
	HStack,
	Heading,
	Icon,
	IconButton,
	Link,
	SimpleGrid,
	Stack,
	Step,
	StepDescription,
	StepIndicator,
	StepSeparator,
	StepTitle,
	Stepper,
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
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
	FaBoxOpen,
	FaHandHoldingHeart,
	FaLeaf,
	FaSignature,
	FaSnowflake,
} from "react-icons/fa";
import { IoMdBatteryCharging } from "react-icons/io";
import { MdOutlineContentCopy } from "react-icons/md";
import { auth, db } from "../../../firebase";
import { TrackingTimeline } from "../tracking";

// ? OrderPage is the page where all the orders are listed created by the user and the user can view the details of each order.

const OrdersPage = () => {
	const router = useRouter();
	const [currentUser] = useAuthState(auth);
	const [value, setValue] = useState<DocumentData | undefined>({});

	//  useCollectionData is a hook provided by react-firebase-hooks/firestore where it fetches all the orders from the database that is made by the currentUser and excludes the orders that are returned.
	const [values, loading, error] = useCollectionData(
		query(
			collection(db, "orders"),
			where("userId", "==", currentUser?.uid ?? "-"),
			where("status", "!=", "RETURNED")
		),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	// It fetches the payment information of the order that is selected by the user.
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

	// it filters the payment information and returns the payment that is completed.
	const successPayment = payment?.filter(
		(singlePayment) => singlePayment.status === "COMPLETED"
	)[0];

	// only the latest payment is used because the payment might be initiated multiple times and only the latest completed payment is used.
	const latestPayment = successPayment ?? payment?.[0];

	useEffect(() => {
		setValue(
			values?.filter((order) => order.orderId === router.query.id)[0] ?? {}
		);
	}, [router.query.id, values]);

	const { onCopy, hasCopied } = useClipboard(value?.orderId ?? "");

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

	if (!values && !loading) {
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
					{/* all the orders are displayed in the form of a list and the user can select the order from the list to view the details of the order. */}
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
						router.query.id && <OrderInfoSkeleton />
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
						// Order details of a specific order is displayed here.
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

									<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
										Your Order is{" "}
										<Tooltip label="Order Status" closeOnClick={false}>
											<Text as="span">
												{
													orderPageTextFromStatus(value?.status?.toUpperCase())
														.info
												}
											</Text>
										</Tooltip>
									</Heading>
								</VStack>
							</VStack>
							<Box>
								<Text>Hi {currentUser?.displayName},</Text>
								<Text>
									{orderPageTextFromStatus(value?.status?.toUpperCase()).header}
								</Text>
							</Box>
							<HStack
								justifyContent="space-around"
								w="full"
								alignItems="flex-start"
							>
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

							<TrackingTimeline status={value?.status} orientation="vertical" />

							<VStack w="full" px={{ base: 2, lg: 8 }} gap={2} py={4}>
								<Divider />
								<HStack
									justify="space-between"
									w="full"
									fontWeight="bold"
									fontSize="xl"
								>
									<Text color={mode("gray.500", "gray.300")}>Order Total</Text>
									<PriceTag price={value?.price ?? 0} currency="NPR" />
								</HStack>
							</VStack>
							<Box>
								<Text>
									{orderPageTextFromStatus(value?.status?.toUpperCase()).footer}
								</Text>
							</Box>
							<Box>
								<Text>Thank you,</Text>
								<Text>Hulak Team</Text>
							</Box>
							<Text w="full" fontSize="lg">
								Have a Problem? Contact our{" "}
								<Link href="/support">Customer Support </Link>
							</Text>
						</Stack>
					)}
				</Box>
			</HStack>
		</VStack>
	);
};

export default withProtected(OrdersPage);

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

// This function returns the text that is displayed in the order details page based on the status of the order.

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

// This function returns the color of the badge based on the status of the order.

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

// This is the order list component that is used to display the list of orders in the order page in card format.
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
		return <OrderListSkeleton />;
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
	const steps = [
		{ title: "From", description: order.source.city },
		{ title: "To", description: order.destination.city },
	];

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
			<HStack alignItems="flex-start" w="full">
				<VStack py="6" pl="4" m="0">
					{order.isCarbonNeutral && (
						<Icon as={FaLeaf} fill="green.500" title="Carbon Neutral" />
					)}
					{order.isLithiumIncluded && (
						<Icon
							as={IoMdBatteryCharging}
							fill="red.500"
							title="Lithium Battery Included"
						/>
					)}
					{order.isSignatureIncluded && (
						<Icon as={FaSignature} title="Signature Included" />
					)}
					{order.isDryIceIncluded && (
						<Icon as={FaSnowflake} fill="blue.500" title="Dry Ice Included" />
					)}
					{order.deliverOnlyToReceiver && (
						<Icon
							as={FaHandHoldingHeart}
							fill="yellow.500"
							title="Deliver to Reciever"
						/>
					)}
					{order.isOversizedPackageIncluded && (
						<Icon as={FaBoxOpen} fill="brown" title="Over Sized Package" />
					)}
				</VStack>
				<Box flexGrow="1">
					<CardHeader>
						<VStack alignItems="flex-start">
							<Text fontWeight="semibold" fontSize="lg">
								{" "}
								{order.orderId}
							</Text>
							<Text fontSize="sm" lineHeight="0">
								{dayjs(Number(order.createdAt.seconds * 1000)).format(
									"DD MMMM, YYYY"
								)}
							</Text>
						</VStack>
					</CardHeader>
					<CardBody
						pt="1"
						display="flex"
						flexDirection="column"
						justifyContent="space-between"
						alignItems="flex-start"
						gap={2}
						w="full"
					>
						<HStack w="full" justifyContent="space-around">
							<Stepper
								size="xs"
								index={1}
								orientation="vertical"
								height="100px"
								gap="0"
								colorScheme="brand"
							>
								{steps.map((step, index) => (
									<Step key={`${index + 1}`}>
										<StepIndicator />
										<Box flexShrink="0">
											<StepTitle>{step.title}</StepTitle>
											<StepDescription>{step.description}</StepDescription>
										</Box>
										<StepSeparator />
									</Step>
								))}
							</Stepper>
							<Stepper
								size="xs"
								index={1}
								orientation="vertical"
								height="100px"
								gap="0"
								colorScheme="brand"
							>
								<Step>
									<Box flexShrink="0">
										<StepTitle>Status</StepTitle>
										<StepDescription>
											{order?.status ?? "PENDING"}
										</StepDescription>
									</Box>
								</Step>
								<Step>
									<Box flexShrink="0">
										<StepTitle>Price</StepTitle>
										<StepDescription>
											{latestPayment?.status === "COMPLETED"
												? order?.price
												: "UNPAID"}
										</StepDescription>
									</Box>
								</Step>
							</Stepper>
						</HStack>
					</CardBody>
				</Box>
			</HStack>
		</Card>
	);
};

export { OrderList };
