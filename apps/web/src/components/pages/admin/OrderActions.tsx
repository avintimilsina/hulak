import ConfirmationModal from "@/components/helpers/ConfirmationModal";
import { Button, HStack } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

interface OrderActionsProps {
	status: string;
	orderId: string;
}
const OrderActions = ({ status, orderId }: OrderActionsProps) => {
	const handlePicked = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "PICKED",
			},
			{ merge: true }
		);
	};
	const handlePlaced = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "PLACED",
			},
			{ merge: true }
		);
	};
	const handleShipped = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "SHIPPED",
			},
			{ merge: true }
		);
	};
	const handleOutForDelivery = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "OUTFORDELIVERY",
			},
			{ merge: true }
		);
	};
	const handleDelivered = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "DELIVERED",
			},
			{ merge: true }
		);
	};
	const handleCompleted = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "COMPLETED",
			},
			{ merge: true }
		);
	};
	const handleReturned = async () => {
		await setDoc(
			doc(db, "orders", orderId),
			{
				status: "RETURNED",
			},
			{ merge: true }
		);
	};

	if (status === "PLACED") {
		return (
			<HStack>
				<Button colorScheme="green" onClick={handlePicked}>
					Order Picked
				</Button>
				<ConfirmationModal
					colorScheme="red"
					onSuccess={handleReturned}
					bodyText="Are you sure you want to cancel this order?"
					headerText="Cancel Order"
				>
					Cancel
				</ConfirmationModal>
			</HStack>
		);
	}
	if (status === "PICKED") {
		return (
			<HStack>
				<Button colorScheme="green" onClick={handleShipped}>
					Order Shipped
				</Button>
				<ConfirmationModal
					colorScheme="purple"
					onSuccess={handlePlaced}
					bodyText="Are you sure you want to move this order to Placed?"
					headerText="Move to Placed"
				>
					Return to Placed
				</ConfirmationModal>
				<ConfirmationModal
					colorScheme="red"
					onSuccess={handleReturned}
					bodyText="Are you sure you want to cancel this order?"
					headerText="Cancel Order"
				>
					Cancel
				</ConfirmationModal>
			</HStack>
		);
	}
	if (status === "SHIPPED") {
		return (
			<HStack>
				<Button colorScheme="green" onClick={handleOutForDelivery}>
					Order Out For Delivery
				</Button>
				<ConfirmationModal
					colorScheme="purple"
					onSuccess={handlePicked}
					bodyText="Are you sure you want to move this order to Picked?"
					headerText="Move to Picked"
				>
					Return to Picked
				</ConfirmationModal>
				<ConfirmationModal
					colorScheme="red"
					onSuccess={handleReturned}
					bodyText="Are you sure you want to cancel this order?"
					headerText="Cancel Order"
				>
					Cancel
				</ConfirmationModal>
			</HStack>
		);
	}
	if (status === "OUTFORDELIVERY") {
		return (
			<HStack>
				<Button colorScheme="green" onClick={handleDelivered}>
					Order Delivered
				</Button>
				<ConfirmationModal
					colorScheme="purple"
					onSuccess={handleShipped}
					bodyText="Are you sure you want to move this order to Shipped?"
					headerText="Move to Shipped"
				>
					Return to Shipped
				</ConfirmationModal>
				<ConfirmationModal
					colorScheme="red"
					onSuccess={handleReturned}
					bodyText="Are you sure you want to cancel this order?"
					headerText="Cancel Order"
				>
					Cancel
				</ConfirmationModal>
			</HStack>
		);
	}
	if (status === "DELIVERED") {
		return (
			<HStack>
				<Button colorScheme="green" onClick={handleCompleted}>
					Completed
				</Button>
				<ConfirmationModal
					colorScheme="purple"
					onSuccess={handleOutForDelivery}
					bodyText="Are you sure you want to move this order to Out For Delivery?"
					headerText="Move to Out For Delivery"
				>
					Return to Out For Delivery
				</ConfirmationModal>
			</HStack>
		);
	}

	return <p> </p>;
};

export default OrderActions;
