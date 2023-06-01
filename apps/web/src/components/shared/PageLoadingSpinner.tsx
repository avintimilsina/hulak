import { Grid, Spinner } from "@chakra-ui/react";

// ? PageLoadingSpinner component is used to display the loading spinner on the page

// default Spinner component from Chakra UI is used for the  animated loading spinner
const PageLoadingSpinner = () => (
	<Grid placeItems="center" height="100vh">
		<Spinner />
	</Grid>
);

export default PageLoadingSpinner;
