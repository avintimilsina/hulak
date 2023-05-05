import { Grid, Spinner } from "@chakra-ui/react";

const PageLoadingSpinner = () => (
	<Grid placeItems="center" height="100vh">
		<Spinner />
	</Grid>
);

export default PageLoadingSpinner;
