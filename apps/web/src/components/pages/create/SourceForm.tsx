import InputField from "@/components/ui/InputField";
import { Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

// ? SourceForm component is used to display the form for the source location details

const SourceForm = () => {
	const t = useTranslations("CreateOrder");

	return (
		<Stack spacing="4">
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("source-fields.name")}
					name="source.name"
					type="text"
				/>
				<InputField
					label={t("source-fields.contact")}
					name="source.contactName"
					type="text"
				/>
			</Stack>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("source-fields.email")}
					name="source.email"
					type="email"
				/>
				<InputField
					label={t("source-fields.phone")}
					name="source.phoneNumber"
					type="numeric"
				/>
			</Stack>
			<InputField
				label={t("source-fields.address-line-1")}
				name="source.addressLine1"
				type="text"
			/>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("source-fields.address-line-2")}
					name="source.addressLine2"
					type="text"
				/>
				<InputField
					label={t("source-fields.city")}
					name="source.city"
					type="text"
				/>
			</Stack>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("source-fields.zip")}
					name="source.zip"
					type="numeric"
				/>
				<InputField
					label={t("source-fields.state")}
					name="source.state"
					type="text"
				/>
				<InputField
					label={t("source-fields.country")}
					name="source.country"
					type="text"
				/>
			</Stack>
		</Stack>
	);
};

export default SourceForm;
