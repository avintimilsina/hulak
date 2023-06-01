import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderShippedPage is a page where the admin can view all the orders that are shipped

const OrderShippedPage = () => (
	<>
		<OrderLayout status="SHIPPED" />;
	</>
);

export default withAdminProtected(OrderShippedPage);
