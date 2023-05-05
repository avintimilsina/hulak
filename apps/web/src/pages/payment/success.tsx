import Result from "@/components/shared/Result";
import { useRouter } from "next/router";

const SuccessPage = () => {
	const router = useRouter();
	return (
		<Result
			heading="Payment Successfull"
			type="success"
			text=""
			dump={router.query}
		/>
	);
};

export default SuccessPage;
