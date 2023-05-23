import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderDeliveredPage = () => (
	<>
		<OrderLayout status="DELIVERED" />;
	</>
);

export default withAdminProtected(OrderDeliveredPage);
