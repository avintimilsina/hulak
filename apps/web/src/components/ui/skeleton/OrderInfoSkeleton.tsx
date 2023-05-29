import {
	Badge,
	Box,
	Card,
	Divider,
	HStack,
	Heading,
	Skeleton,
	SkeletonCircle,
	Stack,
	Text,
	Tooltip,
	VStack,
} from "@chakra-ui/react";

const OrderInfoSkeleton = () => (
	<Stack
		overflowY="scroll"
		as={Card}
		p={8}
		gap={8}
		alignItems="flex-start"
		justifyContent="space-between"
		maxW="3xl"
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
						<Tooltip label="Payment Status" closeOnClick={false}>
							<Badge fontSize="xl" px={3} py={1}>
								PAYMENT PENDING
							</Badge>
						</Tooltip>
					</Skeleton>
				</HStack>
				<Skeleton>
					<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
						Your Order is PLACED
					</Heading>
				</Skeleton>
			</VStack>
		</VStack>
		<VStack alignItems="flex-start">
			<Skeleton>
				<Text>Hi Avin Timilsina,</Text>
			</Skeleton>
			<Skeleton>
				<Text>
					Your order has been picked! We`ll send you shipping confirmation once
					your order is on the way!
				</Text>
			</Skeleton>
		</VStack>
		<HStack justifyContent="space-around" w="full" alignItems="flex-start">
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

		<VStack gap="4" w="full" alignItems="center">
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
			<HStack>
				<SkeletonCircle size="12" />
				<Skeleton>
					<Text fontSize="2xl">Order Placed</Text>
				</Skeleton>
			</HStack>
		</VStack>

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

		<Box>
			<Skeleton>
				<Text>
					We appreciate your business, and hope you enjoy your purchase.
				</Text>
			</Skeleton>
		</Box>
		<VStack w="full" px={{ base: 2, lg: 8 }} py={4} alignItems="flex-start">
			<Skeleton>
				<Text>Thank you,</Text>
			</Skeleton>
			<Skeleton>
				<Text>Hulak Team</Text>
			</Skeleton>
		</VStack>
		<Skeleton>
			<Text w="full" fontSize="lg">
				Have a Problem? Contact our Customer Support
			</Text>
		</Skeleton>
	</Stack>
);

export default OrderInfoSkeleton;
