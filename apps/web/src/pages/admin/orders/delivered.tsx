import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderDeliveredPage is a page where the admin can view all the delivered orders

const OrderDeliveredPage = () => (
	<>
		<OrderLayout status="DELIVERED" />;
	</>
);

export default withAdminProtected(OrderDeliveredPage);
