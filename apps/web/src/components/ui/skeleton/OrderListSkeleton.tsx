import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	HStack,
	Icon,
	Skeleton,
	SkeletonCircle,
	Tag,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BsArrowReturnRight } from "react-icons/bs";

const OrderListSkeleton = () => (
	<Card size="sm">
		<CardHeader pb="1">
			<HStack justifyContent="space-between">
				<Skeleton>
					<Text>DD MMMM, YYYY</Text>
				</Skeleton>
				<Skeleton>
					<Tag px={2}>ORDER PLACED</Tag>
				</Skeleton>
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
				<Skeleton alignSelf="flex-start">
					<Text>Sinamangal Rd</Text>
				</Skeleton>
				<HStack justifyContent="space-between" gap="6">
					<Skeleton>
						<Icon as={BsArrowReturnRight} width="30px" />
					</Skeleton>
					<Skeleton alignSelf="flex-end">
						<Text>Sinamangal Rd </Text>
					</Skeleton>
				</HStack>
			</VStack>
		</CardBody>
		<CardFooter as={HStack} justifyContent="space-between" pt="1">
			<Skeleton>
				<Tag px={2} m="0">
					$ PENDING
				</Tag>
			</Skeleton>
			<HStack p="0" m="0" gap="0">
				<SkeletonCircle size="6" />
				<SkeletonCircle size="6" />
				<SkeletonCircle size="6" />
				<SkeletonCircle size="6" />
				<SkeletonCircle size="6" />
			</HStack>
		</CardFooter>
	</Card>
);

export default OrderListSkeleton;
