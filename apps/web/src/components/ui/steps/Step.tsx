/* eslint-disable no-nested-ternary */
import {
	Box,
	BoxProps,
	Circle,
	Collapse,
	Heading,
	HStack,
	Icon,
	useColorModeValue,
} from "@chakra-ui/react";
import { BsCheck2 } from "react-icons/bs";
import useStep from "./useStep";

// ? Steps is a component used to display the steps in the create-order page

interface StepProps extends BoxProps {
	title?: string;
}

const Step = (props: StepProps) => {
	const { title, children, ...boxProps } = props;
	const { isActive, isCompleted, step } = useStep();

	const accentColor = "brand.500";
	const mutedColor = useColorModeValue("gray.600", "whiteAlpha.800");
	const activeColor = useColorModeValue("white", "black");

	return (
		<Box {...boxProps}>
			<HStack spacing="4">
				<Circle
					size="8"
					fontWeight="bold"
					color={
						isActive ? activeColor : isCompleted ? accentColor : mutedColor
					}
					bg={isActive ? accentColor : "transparent"}
					borderColor={isCompleted ? accentColor : "inherit"}
					borderWidth={isActive ? "0px" : "1px"}
				>
					{isCompleted ? <Icon as={BsCheck2} /> : step}
				</Circle>
				<Heading
					fontSize="lg"
					fontWeight="semibold"
					color={isActive || isCompleted ? "inherit" : mutedColor}
				>
					{title}
				</Heading>
			</HStack>
			<Collapse in={isActive}>{children}</Collapse>
		</Box>
	);
};

Step.defaultProps = {
	title: "",
};

export default Step;
