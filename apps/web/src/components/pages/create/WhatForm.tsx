import CheckboxField from "@/components/ui/CheckboxField";
import InputField from "@/components/ui/InputField";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

// ? WhatForm component is used to display the form for the package details

const WhatForm = () => {
	const t = useTranslations("CreateOrder");
	return (
		<Stack spacing="4">
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("what-fields.length")}
					name="package.length"
					type="number"
				/>
				<InputField
					label={t("what-fields.width")}
					name="package.width"
					type="number"
				/>
				<InputField
					label={t("what-fields.height")}
					name="package.height"
					type="number"
				/>
			</Stack>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("what-fields.weight")}
					name="package.weight"
					type="number"
				/>
				<InputField
					label={t("what-fields.total-package-value")}
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
					label={t("what-fields.is-lithium-included")}
					name="isLithiumIncluded"
				/>
				<CheckboxField
					label={t("what-fields.is-dry-ice-included")}
					name="isDryIceIncluded"
				/>
				<CheckboxField
					label={t("what-fields.is-signature-included")}
					name="isSignatureIncluded"
				/>
				<CheckboxField
					label={t("what-fields.is-oversized-package-included")}
					name="isOversizedPackageIncluded"
				/>
			</SimpleGrid>
		</Stack>
	);
};

export default WhatForm;
