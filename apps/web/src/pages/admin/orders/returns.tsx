import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderReturnedPage = () => (
	<>
		<OrderLayout status="RETURNED" />;
	</>
);

export default withAdminProtected(OrderReturnedPage);
