import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderShippedPage = () => (
	<>
		<OrderLayout status="SHIPPED" />;
	</>
);

export default withAdminProtected(OrderShippedPage);
