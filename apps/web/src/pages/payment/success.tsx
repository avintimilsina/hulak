import withProtected from "@/routes/withProtected";
import {
	SimpleGrid,
	Stack,
	VStack,
	HStack,
	Tooltip,
	Badge,
	Heading,
	IconButton,
	Button,
	useClipboard,
	Text,
	Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdOutlineContentCopy } from "react-icons/md";

// ? SuccessPage is a page where the user is redirected after the payment is successful

const SuccessPage = () => {
	const router = useRouter();
	const { onCopy, hasCopied } = useClipboard(
		router?.query?.product_identity as string
	);
	useEffect(() => {
		const runThisNow = async () => {
			// It fetches the details about the order and displays it to the user
			if (router.query?.product_identity && router.query?.token) {
				await fetch("/api/update-order", {
					method: "POST",
					body: JSON.stringify({
						orderId: router.query.product_identity,
						token: router.query.token,
						amount: router.query.amount,
					}),
					headers: {
						"content-type": "application/json",
					},
				});
			}
		};
		runThisNow();
	}, [router]);

	return (
		<SimpleGrid placeItems="center" minH="100vh">
			<Stack
				p={8}
				gap={{ base: 8, lg: 48 }}
				alignItems="center"
				justifyContent="space-between"
				my={{ base: 8, lg: 16 }}
				direction={["column", "row"]}
			>
				<VStack alignItems="flex-start" gap={6}>
					<VStack alignItems="flex-start" gap={2}>
						<HStack alignItems="flex-start">
							<Tooltip label="Payment Status" closeOnClick={false}>
								<Badge fontSize="xl" colorScheme="green" px={3} py={1}>
									PAYMENT SUCCESSFUL
								</Badge>
							</Tooltip>
						</HStack>
						<Heading fontSize="5xl" fontWeight="extrabold" lineHeight={1}>
							Thanks for ordering.
						</Heading>
						<Heading fontSize="lg" lineHeight={1}>
							Your Order is{" "}
							<Tooltip label="Order Status" closeOnClick={false}>
								<Text as="span">PLACED</Text>
							</Tooltip>
						</Heading>
					</VStack>
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
						<Text>{router?.query?.product_identity}</Text>
					</VStack>
					<HStack>
						<Button
							colorScheme="brand"
							as={Link}
							href={`/account/orders?id=${router?.query?.product_identity}`}
						>
							View Order
						</Button>
						<Button as={Link} href="/">
							Go Back Home
						</Button>
					</HStack>
					<Text w="full" fontSize="lg">
						Have a Problem? Contact our <Link href="/">Customer Support </Link>
					</Text>
				</VStack>
				<Image h="60vh" src="/assets/order-placed.svg" />
			</Stack>
		</SimpleGrid>
	);
};

export default withProtected(SuccessPage);
