import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderPlacedPage is a page where the admin can view all the orders that are placed

const OrderPlacedPage = () => (
	<>
		<OrderLayout status="PLACED" />;
	</>
);

export default withAdminProtected(OrderPlacedPage);
