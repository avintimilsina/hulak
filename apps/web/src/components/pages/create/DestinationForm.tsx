import InputField from "@/components/ui/InputField";
import { Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

// ? DestinationForm component is used to display the form for the destination location details

const DestinationForm = () => {
	const t = useTranslations("CreateOrder");
	return (
		<Stack spacing="4">
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("destination-fields.name")}
					name="destination.name"
					type="text"
				/>
				<InputField
					label={t("destination-fields.contact")}
					name="destination.contactName"
					type="text"
				/>
			</Stack>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("destination-fields.email")}
					name="destination.email"
					type="email"
				/>
				<InputField
					label={t("destination-fields.phone")}
					name="destination.phoneNumber"
					type="numeric"
				/>
			</Stack>
			<InputField
				label={t("destination-fields.address-line-1")}
				name="destination.addressLine1"
				type="text"
			/>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("destination-fields.address-line-2")}
					name="destination.addressLine2"
					type="text"
				/>
				<InputField
					label={t("destination-fields.city")}
					name="destination.city"
					type="text"
				/>
			</Stack>
			<Stack gap={3} direction={{ base: "column", lg: "row" }}>
				<InputField
					label={t("destination-fields.zip")}
					name="destination.zip"
					type="numeric"
				/>
				<InputField
					label={t("destination-fields.state")}
					name="destination.state"
					type="text"
				/>
				<InputField
					label={t("destination-fields.country")}
					name="destination.country"
					type="text"
				/>
			</Stack>
		</Stack>
	);
};

export default DestinationForm;
