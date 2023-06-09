import CheckboxField from "@/components/ui/CheckboxField";
import InputField from "@/components/ui/InputField";
import { SimpleGrid, Stack } from "@chakra-ui/react";

// ? WhatForm component is used to display the form for the package details

const WhatForm = () => (
	<Stack spacing="4">
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Length (cm)" name="package.length" type="number" />
			<InputField label="Width (cm)" name="package.width" type="number" />
			<InputField label="Height (cm)" name="package.height" type="number" />
		</Stack>
		<Stack gap={3} direction={{ base: "column", lg: "row" }}>
			<InputField label="Weight (Kg)" name="package.weight" type="number" />
			<InputField
				label="Total Package Value"
				name="package.value"
				type="number"
			/>
		</Stack>
		<SimpleGrid
			columns={2}
			spacing={4}
			display={{ base: "flex-row", lg: "grid" }}
		>
			<CheckboxField
				label="Include Lithium Batteries (+$)"
				name="isLithiumIncluded"
			/>
			<CheckboxField label="Include Dry Ice (+$)" name="isDryIceIncluded" />
			<CheckboxField
				label="Signature Options (+$)"
				name="isSignatureIncluded"
			/>
			<CheckboxField
				label="Oversized Package (+$)"
				name="isOversizedPackageIncluded"
			/>
		</SimpleGrid>
	</Stack>
);

export default WhatForm;
