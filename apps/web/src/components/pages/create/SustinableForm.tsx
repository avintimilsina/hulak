import CheckboxField from "@/components/ui/CheckboxField";
import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	Stack,
	Textarea,
} from "@chakra-ui/react";
import { Field } from "formik";
import { useTranslations } from "next-intl";

// ? SustinableForm component is used to display the form for the sustainable shipping options

const SustinableForm = () => {
	const t = useTranslations("CreateOrder");
	return (
		<Stack spacing="4">
			<Field name="description">
				{({ field, meta }: any) => (
					<FormControl isInvalid={meta.error && meta.touched}>
						<HStack justifyContent="space-between">
							<FormLabel>{t("sustinable-fields.heading")}</FormLabel>
							<FormErrorMessage>{meta.error}</FormErrorMessage>
						</HStack>
						<Input as={Textarea} {...field} type="text" maxLength={255} />
					</FormControl>
				)}
			</Field>
			<CheckboxField
				label={t("sustinable-fields.deliver-only-to-receiver")}
				name="deliverOnlyToReceiver"
			/>
			<CheckboxField
				label={t("sustinable-fields.is-carbon-neutral")}
				name="isCarbonNeutral"
			/>
		</Stack>
	);
};

export default SustinableForm;
