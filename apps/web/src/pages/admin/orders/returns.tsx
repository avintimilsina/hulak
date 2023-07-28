import OrderLayout from "@/components/pages/admin/OrderLayout";
import withAdminProtected from "@/routes/withAdminProtected";
import { GetStaticPropsContext } from "next";

// ? OrderReturnedPage is a page where the admin can view all the returned orders

const OrderReturnedPage = () => (
	<>
		<OrderLayout status="RETURNED" />;
	</>
);

export default withAdminProtected(OrderReturnedPage);
export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../../messages/${ctx.locale}.json`)).default,
	},
});
