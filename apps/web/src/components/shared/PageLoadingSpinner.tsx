import { Grid, Spinner, Text, VStack } from "@chakra-ui/react";

// ? PageLoadingSpinner component is used to display the loading spinner on the page

// default Spinner component from Chakra UI is used for the  animated loading spinner
interface PageLoadingSpinnerProps {
	text?: string;
}

const PageLoadingSpinner = ({ text }: PageLoadingSpinnerProps) => (
	<Grid placeItems="center" height="100vh">
		<VStack w="full">
			<Spinner size="xl" w="full" />
			{text && process.env.NODE_ENV === "development" && <Text>{text}</Text>}
		</VStack>
	</Grid>
);

PageLoadingSpinner.defaultProps = {
	text: null,
};

export default PageLoadingSpinner;

const NativeLoadingSpinner = () => (
	<Grid placeItems="center" height="100vh">
		<svg
			className="spinner"
			width="32px"
			height="32px"
			viewBox="0 0 66 66"
			xmlns="http://www.w3.org/2000/svg"
		>
			<circle
				className="path"
				fill="none"
				strokeWidth="6"
				strokeLinecap="round"
				cx="33"
				cy="33"
				r="30"
			/>
		</svg>
	</Grid>
);

export { NativeLoadingSpinner };
