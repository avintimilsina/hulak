import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";
import { GetStaticPropsContext } from "next";

// ? OrderOutForDeliveryPage is a page where the admin can view all the orders that are out for delivery

const OrderOutForDeliveryPage = () => (
	<>
		<OrderLayout status="OUTFORDELIVERY" />;
	</>
);

export default withAdminProtected(OrderOutForDeliveryPage);
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../../messages/${ctx.locale}.json`)).default,
	},
});
