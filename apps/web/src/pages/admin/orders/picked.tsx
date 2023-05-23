import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";

const OrderPickedPage = () => (
	<>
		<OrderLayout status="PICKED" />;
	</>
);

export default withAdminProtected(OrderPickedPage);
