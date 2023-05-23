import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderPlacedPage = () => (
	<>
		<OrderLayout status="PLACED" />;
	</>
);

export default withAdminProtected(OrderPlacedPage);
