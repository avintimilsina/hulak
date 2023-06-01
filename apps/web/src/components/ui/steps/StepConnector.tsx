import { Box } from "@chakra-ui/react";
import useStep from "./useStep";

const StepConnector = () => {
	const { isCompleted, isActive } = useStep();

	return (
		<Box
			borderStartWidth="1px"
			borderStartColor={isCompleted ? "brand.500" : "inherit"}
			height="6"
			mt={isActive ? "0" : "2"}
			mb="2"
			ms="4"
			ps="4"
		/>
	);
};

export default StepConnector;
