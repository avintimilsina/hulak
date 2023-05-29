import {
	Badge,
	Button,
	Card,
	Divider,
	HStack,
	Skeleton,
	SkeletonCircle,
	Stack,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";

const OrderLayoutSkeleton = () => (
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
					<Skeleton>
						<Tooltip label="Payment Status" closeOnClick={false}>
							<Badge fontSize="xl" px={3} py={1}>
								PAYMENT COMPLETED
							</Badge>
						</Tooltip>
					</Skeleton>
					<Skeleton>
						<Tooltip label="Order Status" closeOnClick={false}>
							<Badge fontSize="xl" px={3} py={1}>
								ORDER PLACED
							</Badge>
						</Tooltip>
					</Skeleton>
				</HStack>
			</VStack>
		</VStack>
		<VStack>
			<HStack>
				<Skeleton>
					<Text fontSize="lg" fontWeight="semibold">
						Tracking Number
					</Text>
				</Skeleton>
				<SkeletonCircle />
			</HStack>
			<Skeleton>
				<Text>mh7y7JusnSBCMftesBpk</Text>
			</Skeleton>
		</VStack>
		<HStack justifyContent="space-around" w="full" alignItems="flex-start">
			<VStack alignItems="flex-start">
				<Skeleton>
					<Text>Delivering To:</Text>
				</Skeleton>
				<Skeleton>
					<Text>Sinamangal Rd, EDFsf</Text>
				</Skeleton>
				<Skeleton>
					<Text>Kathmandu,Central Development Region</Text>
				</Skeleton>
				<Skeleton>
					<Text>44600,Nepal</Text>
				</Skeleton>
			</VStack>
			<VStack alignItems="flex-start">
				<Skeleton>
					<Text>Delivering To:</Text>
				</Skeleton>
				<Skeleton>
					<Text>Sinamangal Rd, EDFsf</Text>
				</Skeleton>
				<Skeleton>
					<Text>Kathmandu,Central Development Region</Text>
				</Skeleton>
				<Skeleton>
					<Text>44600,Nepal</Text>
				</Skeleton>
			</VStack>
		</HStack>
		<VStack w="full" px={{ base: 2, lg: 8 }} gap={2} py={4}>
			<Divider />
			<HStack justify="space-between" w="full" fontWeight="bold" fontSize="xl">
				<Skeleton>
					<Text>Order Total</Text>
				</Skeleton>
				<Skeleton>
					<Text>NPR 1000</Text>
				</Skeleton>
			</HStack>
		</VStack>
		<HStack>
			<Skeleton>
				<Button>Order Placed</Button>
			</Skeleton>
			<Skeleton>
				<Button>Order Placed</Button>
			</Skeleton>
			<Skeleton>
				<Button>Order Placed</Button>
			</Skeleton>
		</HStack>
	</Stack>
);

export default OrderLayoutSkeleton;
