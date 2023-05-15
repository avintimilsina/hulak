import CheckboxField from "@/components/ui/CheckboxField";
import InputField from "@/components/ui/InputField";
import { HStack, SimpleGrid, Stack } from "@chakra-ui/react";

const WhatForm = () => (
	<Stack spacing="4">
		<HStack>
			<InputField label="Length (in cm)" name="package.length" type="number" />
			<InputField label="Width (in cm)" name="package.width" type="number" />
			<InputField label="Height (in cm)" name="package.height" type="number" />
		</HStack>
		<HStack>
			<InputField label="Weight (in Kg)" name="package.weight" type="number" />
			<InputField
				label="Total Package Value"
				name="package.value"
				type="number"
			/>
		</HStack>
		<SimpleGrid columns={2} spacing={4}>
			<CheckboxField
				label="Include Lithium Batteries"
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
