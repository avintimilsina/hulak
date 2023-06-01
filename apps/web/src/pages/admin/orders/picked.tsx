import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderPickedPage is a page where the admin can view all the orders that are picked

const OrderPickedPage = () => (
	<>
		<OrderLayout status="PICKED" />;
	</>
);

export default withAdminProtected(OrderPickedPage);
