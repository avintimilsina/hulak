import { PriceTag } from "@/components/shared/PriceTag";
import { OrderInfo } from "@/pages/order/[id]";
import { Link } from "@chakra-ui/next-js";
import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	HStack,
	Stack,
	Text,
	VStack,
	useColorModeValue as mode,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { BiDownload } from "react-icons/bi";

interface OrderCardProps {
	orderItem: any;
}

const OrderCard = ({ orderItem }: OrderCardProps) => (
	<Card direction="column" overflow="hidden" variant="outline" w="full">
		<CardHeader
			as={Stack}
			justifyContent="space-between"
			direction={["column", "row"]}
			bg={mode("gray.50", "gray.800")}
		>
			<HStack gap={4} flexWrap="wrap">
				<OrderInfo label="Order Date">
					<Text>
						{dayjs(Number(orderItem.createdAt)).format("DD MMMM, YYYY")}
					</Text>
				</OrderInfo>
				<OrderInfo label="Total Amount">
					<PriceTag price={123} currency="NPR" />
				</OrderInfo>
				<OrderInfo label="Order number">
					<Text>{orderItem.pidx}</Text>
				</OrderInfo>
			</HStack>
			<HStack>
				<Button size="sm" as={Link} href={`/order/${orderItem.pidx}`}>
					View Order
				</Button>
				<Button size="sm" leftIcon={<BiDownload />}>
					Download Invoice
				</Button>
			</HStack>
		</CardHeader>
		<Divider />

		<CardBody
			as={Stack}
			gap={{ base: 2, lg: 12 }}
			alignItems="flex-start"
			direction={{ base: "column", lg: "row" }}
			overflowX="auto"
		>
			{/* <VStack flexGrow={1}>
					<Heading fontSize="xl" w="full" lineHeight={2}>
						Order is being delivered
					</Heading>
					{orderItem.orderitems?.map((item) => (
						<OrderCardItem key={item.id} cartItem={item as OrderItem} />
					))}
				</VStack> */}
			<VStack
				px={{ base: 2, lg: 8 }}
				gap={2}
				py={4}
				w={{ base: "full", lg: "md" }}
			>
				<Button w="full" colorScheme="blue">
					Track Package
				</Button>
				<Button w="full">Cancel this Delivery</Button>
				<Button w="full">Write a Review</Button>
			</VStack>
		</CardBody>
		<Divider />

		<CardFooter as={HStack} alignItems="flex-start" gap={6}>
			{/* <OrderInfo label="Address">
				<Text>{orderItem.address.address}</Text>
				<Text>
					{orderItem.address.state} {orderItem.address.zip},{" "}
					{orderItem.address.city}, {orderItem.address.country}
				</Text>
			</OrderInfo> */}
			<OrderInfo label="Payment">
				<Badge colorScheme="red" fontSize="lg" px={2}>
					UNPAID
				</Badge>
			</OrderInfo>
		</CardFooter>
	</Card>
);

export default OrderCard;
