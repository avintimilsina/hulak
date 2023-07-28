import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";
import { GetStaticPropsContext } from "next";

// ? OrderPickedPage is a page where the admin can view all the orders that are picked

const OrderPickedPage = () => (
	<>
		<OrderLayout status="PICKED" />;
	</>
);

export default withAdminProtected(OrderPickedPage);
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
