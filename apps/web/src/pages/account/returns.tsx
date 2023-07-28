/* eslint-disable no-nested-ternary */
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
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
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { GetStaticPropsContext } from "next";
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
import { BsArrowReturnRight } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { MdOutlineContentCopy } from "react-icons/md";
import { auth, db } from "../../../firebase";

// ? Return page is a page where the user can view their returned or cancelled orders
// It follows the same format as the other pages in the account folder

const ReturnPage = () => {
	const router = useRouter();
	const [currentUser] = useAuthState(auth);
	const [value, setValue] = useState<DocumentData | undefined>({});
	const [values, loading, error] = useCollectionData(
		query(
			collection(db, "orders"),
			where("userId", "==", currentUser?.uid ?? "-"),
			where("status", "==", "RETURNED")
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

export default withProtected(ReturnPage);

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
				info: "Returned",
				header: "Your order has been cancelled!",
				footer: "Please contact our support team for further details.",
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
			return "blue.500";
		case "INITIATED":
			return "yellow";
		case "COMPLETED":
			return "green";
		case "PLACED":
			return "blue.500";
		case "SHIPPED":
			return "blue.500";
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
					PAYMENT {latestPayment?.status?.toUpperCase() ?? "PENDING"}
				</Tag>
				<HStack>
					{order.isCarbonNeutral && <Icon as={FaLeaf} fill="green.500" />}
				</HStack>
			</CardFooter>
		</Card>
	);
};
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
