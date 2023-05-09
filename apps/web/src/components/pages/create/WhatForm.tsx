import {
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	Stack,
} from "@chakra-ui/react";
import { Field } from "formik";

const WhatForm = () => (
	<Stack spacing="4">
		<Heading>What kind of packaging are you using?</Heading>
		<Field name="packageWeight">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={form.errors.packageWeight && form.touched.packageWeight}
				>
					<FormLabel>Weight</FormLabel>
					<Input {...field} type="text" maxLength={255} />
					<FormErrorMessage>{form.errors.packageWeight}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="packageLength">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={form.errors.packageLength && form.touched.packageLength}
				>
					<FormLabel>Length</FormLabel>
					<Input {...field} type="text" maxLength={255} />
					<FormErrorMessage>{form.errors.packageLength}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="packageWidth">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={form.errors.packageWidth && form.touched.packageWidth}
				>
					<FormLabel>Width</FormLabel>
					<Input {...field} type="text" maxLength={255} />
					<FormErrorMessage>{form.errors.packageWidth}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="packageHeight">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={form.errors.packageHeight && form.touched.packageHeight}
				>
					<FormLabel>Height</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>{form.errors.packageHeight}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="packageValue">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={form.errors.packageValue && form.touched.packageValue}
				>
					<FormLabel>Total Package Value</FormLabel>
					<Input {...field} type="text" />
					<FormErrorMessage>{form.errors.packageValue}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="isLithiumIncluded" type="checkbox">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.isLithiumIncluded && form.touched.isLithiumIncluded
					}
				>
					<Checkbox {...field}>Include Lithium Batteries</Checkbox>
					<FormErrorMessage>{form.errors.isLithiumIncluded}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="isDryIceIncluded" type="checkbox">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.isDryIceIncluded && form.touched.isDryIceIncluded
					}
				>
					<Checkbox {...field}>Include Dry Ice (+$)</Checkbox>
					<FormErrorMessage>{form.errors.isDryIceIncluded}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="isSignatureIncluded" type="checkbox">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.isSignatureIncluded && form.touched.isSignatureIncluded
					}
				>
					<Checkbox {...field}>Signature Options (+$)</Checkbox>
					<FormErrorMessage>{form.errors.isSignatureIncluded}</FormErrorMessage>
				</FormControl>
			)}
		</Field>
		<Field name="isOversizedPackageIncluded" type="checkbox">
			{({ field, form }: any) => (
				<FormControl
					isInvalid={
						form.errors.isOversizedPackageIncluded &&
						form.touched.isOversizedPackageIncluded
					}
				>
					<Checkbox {...field}>Oversized Package (+$)</Checkbox>
					<FormErrorMessage>
						{form.errors.isOversizedPackageIncluded}
					</FormErrorMessage>
				</FormControl>
			)}
		</Field>
	</Stack>
);

export default WhatForm;
