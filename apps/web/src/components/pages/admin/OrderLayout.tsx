/* eslint-disable no-nested-ternary */
import { PriceTag } from "@/components/shared/PriceTag";
import Result from "@/components/shared/Result";
import OrderLayoutSkeleton from "@/components/ui/skeleton/OrderLayoutSkeleton";
import { OrderList } from "@/pages/account/orders";
import {
	Badge,
	Box,
	Card,
	HStack,
	Heading,
	IconButton,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
	VStack,
	useColorModeValue as mode,
	useClipboard,
} from "@chakra-ui/react";
import {
	DocumentData,
	collection,
	collectionGroup,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MdOutlineContentCopy } from "react-icons/md";
import { db } from "../../../../firebase";
import OrderActions from "./OrderActions";

// ? OrderLayout is a component where the admin can view the details of the order created by various user

interface OrderLayoutProps {
	status: string;
}
const OrderLayout = ({ status }: OrderLayoutProps) => {
	const router = useRouter();
	const [value, setValue] = useState<DocumentData | undefined>({});

	// useCollectionData is a function from react-firebase-hooks/firestore that is used to fetch all the orders from the database with the status of the order as the status passed in the props and sort them in descending order of the createdAt field
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

	// useCollectionData is a function from react-firebase-hooks/firestore that is used to fetch all the payments from the database with the orderId of the payment as the orderId of the order and sort them in descending order of the createdAt field
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

	// successPayment is a variable that is used to store the payment with the status of the payment as COMPLETED
	const successPayment = payment?.filter(
		(singlePayment) => singlePayment.status === "COMPLETED"
	)[0];

	// latestPayment is a variable that is used to store the payment with the latest createdAt field to catch if the payment did not complete or error occured in previous tries
	const latestPayment = successPayment ?? payment?.[0];

	// useEffect is a react hook that refreshes the value state whenever the router.query.id(URL) or values changes
	useEffect(() => {
		setValue(
			values?.filter((order) => order.orderId === router.query.id)[0] ?? {}
		);
	}, [router.query.id, values]);

	// useClipboard is a react hook that is used to copy the tracking number of the order
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
	// checks if the there are no orders placed or the orders are still loading
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
					{/* Displays the list of orders as the format of OrderList component */}
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
						// Skeleton UI for the OrderLayout component when the payment is still loading
						router.query.id && <OrderLayoutSkeleton />
					) : !value?.orderId ? (
						// Displays the text when the user has not selected any order to preview
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
						// Displays the details of the order selected by the user
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
								justifyContent="space-around"
								w="full"
								alignItems="flex-start"
							>
								{/* Displays the details of the source and destination of the order */}
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

// ? OrderInfo is a component that is used to display the details of the source and destination of the order
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

// ? orderPageTextFromStatus is a function that is used to display the header and footer of the order based on the status of the order
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

// ? getColorFromStatus is a function that is used to display the color of the status based on the status of the order
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
