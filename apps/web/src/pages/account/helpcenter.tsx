import withProtected from "@/routes/withProtected";
import { GetStaticPropsContext } from "next";
import SupportPage from "../support";

// ? HelpCenterPage is a page where the user can get help from the support team
const HelpCenterPage = () => <SupportPage />;

export default withProtected(HelpCenterPage);

export const getStaticProps = async (ctx: GetStaticPropsContext) => ({
	props: {
		messages: (await import(`../../messages/${ctx.locale}.json`)).default,
	},
});
