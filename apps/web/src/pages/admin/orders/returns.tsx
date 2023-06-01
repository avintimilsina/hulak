import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

// ? OrderReturnedPage is a page where the admin can view all the returned orders

const OrderReturnedPage = () => (
	<>
		<OrderLayout status="RETURNED" />;
	</>
);

export default withAdminProtected(OrderReturnedPage);
