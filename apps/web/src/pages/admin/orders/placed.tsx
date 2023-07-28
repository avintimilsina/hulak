import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";
import { GetStaticPropsContext } from "next";

// ? OrderPlacedPage is a page where the admin can view all the orders that are placed

const OrderPlacedPage = () => (
	<>
		<OrderLayout status="PLACED" />;
	</>
);

export default withAdminProtected(OrderPlacedPage);
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
