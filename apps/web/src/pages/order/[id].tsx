import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { PriceTag } from "@/components/shared/PriceTag";
import Result from "@/components/shared/Result";
import withProtected from "@/routes/withProtected";
import { capitalize } from "@/utils/helpers";
import { Link } from "@chakra-ui/next-js";
import {
	Badge,
	Box,
	Card,
	Divider,
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
import dayjs from "dayjs";
import { doc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { MdOutlineContentCopy } from "react-icons/md";
import { auth, db } from "../../../firebase";

// ? Order Detail Page where the user can view the order details (not used currently as a full page)

const OrderPage = () => {
	const router = useRouter();
	const [currentUser, userLoading, userError] = useAuthState(auth);
	const [value, loading, error] = useDocumentData(
		doc(db, "orders", (router.query.id as string) ?? "-"),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	const { onCopy, hasCopied } = useClipboard(router?.query?.id as string);
	if (loading || userLoading) {
		return <PageLoadingSpinner />;
	}
	if (error || userError) {
		return (
			<Result
				heading={error ? error.name : userError!.name}
				text={error ? error.message : userError!.message}
				type="error"
				dump={error ? error.stack : userError!.stack}
			/>
		);
	}

	if (!value) {
		return (
			<Result
				heading="Order Not Found"
				text="The tracking id may be invalid. Please check for typo and enter it again."
				type="error"
			/>
		);
	}

	return (
		<SimpleGrid placeItems="center" minH="100vh">
			<Stack
				as={Card}
				p={8}
				gap={8}
				alignItems="flex-start"
				justifyContent="space-between"
				my={{ base: 8, lg: 16 }}
				maxW="3xl"
				w={{ base: "unset", lg: "3xl" }}
			>
				<VStack alignItems="flex-start" gap={6}>
					<VStack alignItems="flex-start" gap={2}>
						<HStack alignItems="flex-start">
							<Tooltip label="Payment Status" closeOnClick={false}>
								<Badge fontSize="xl" colorScheme="green" px={3} py={1}>
									PAYMENT{" "}
									{value?.status?.toUpperCase() === "INITIATED"
										? "SUCCESSFUL"
										: "NOT INITIATED"}
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
					<Text>Your order has been confirmed and will be shipping soon.</Text>
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
					<Text>{value?.pidx}</Text>
				</VStack>
				<HStack gap={6}>
					<OrderInfo label="Order Date">
						<Text>
							{dayjs(Number(value.createdAt.seconds)).format("DD MMMM, YYYY")}
						</Text>
					</OrderInfo>
					<OrderInfo label="Payment">
						<Text>Khalti</Text>
					</OrderInfo>
					<OrderInfo label="Address">
						<Text>Sinamangal</Text>
					</OrderInfo>
				</HStack>
				{/* <Stack
					spacing="4"
					width="full"
					p={{ base: 1, md: 4 }}
					divider={<Divider />}
				>
					{data?.orderById.orderitems?.map((item) => (
						<OrderSummaryItem key={item.id} cartItem={item as Cart} />
					))}
				</Stack> */}
				<VStack w="full" px={{ base: 2, lg: 8 }} gap={2} py={4}>
					<HStack justify="space-between" w="full" fontSize="lg">
						<Text color={mode("gray.600", "gray.400")}>Sub Total</Text>
						<PriceTag price={123} currency="NPR" />
					</HStack>
					<HStack justify="space-between" w="full" fontSize="lg">
						<Text color={mode("gray.600", "gray.400")}>Shipping Cost</Text>
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
						We&apos;ll send you shipping confirmation when your item(s) are on
						the way! We appreciate your business, and hope you enjoy your
						purchase.
					</Text>
				</Box>
				<Box>
					<Text>Thank you,</Text>
					<Text>Hulak Team</Text>
				</Box>
				<Text w="full" fontSize="lg">
					Have a Problem? Contact our <Link href="/">Customer Support </Link>
				</Text>
			</Stack>
		</SimpleGrid>
	);
};

export default withProtected(OrderPage);

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
