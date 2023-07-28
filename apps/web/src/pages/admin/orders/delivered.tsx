import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";
import { GetStaticPropsContext } from "next";

// ? OrderDeliveredPage is a page where the admin can view all the delivered orders

const OrderDeliveredPage = () => (
	<>
		<OrderLayout status="DELIVERED" />;
	</>
);

export default withAdminProtected(OrderDeliveredPage);
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../../messages/${ctx.locale}.json`)).default,
	},
});
