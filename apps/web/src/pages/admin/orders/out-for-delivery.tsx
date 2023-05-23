import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderOutForDeliveryPage = () => (
	<>
		<OrderLayout status="OUTFORDELIVERY" />;
	</>
);

export default withAdminProtected(OrderOutForDeliveryPage);
