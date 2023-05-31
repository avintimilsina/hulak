import withProtected from "@/routes/withProtected";
import SupportPage from "../support";

// ? HelpCenterPage is a page where the user can get help from the support team
const HelpCenterPage = () => <SupportPage />;

export default withProtected(HelpCenterPage);
