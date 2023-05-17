import withProtected from "@/routes/withProtected";
import SupportPage from "../support";

const HelpCenterPage = () => <SupportPage />;

export default withProtected(HelpCenterPage);
