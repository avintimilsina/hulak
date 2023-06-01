import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderOutForDeliveryPage is a page where the admin can view all the orders that are out for delivery

const OrderOutForDeliveryPage = () => (
	<>
		<OrderLayout status="OUTFORDELIVERY" />;
	</>
);

export default withAdminProtected(OrderOutForDeliveryPage);
