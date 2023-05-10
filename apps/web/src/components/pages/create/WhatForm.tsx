import {
	Checkbox,
	FormControl,
	FormErrorMessage,
	FormLabel,
	HStack,
	Input,
	SimpleGrid,
	Stack,
} from "@chakra-ui/react";
import { Field } from "formik";

const WhatForm = () => (
	<Stack spacing="4">
		<HStack>
			<Field name="packageLength">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.packageLength && form.touched.packageLength}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Length</FormLabel>
							<FormErrorMessage>{form.errors.packageLength}</FormErrorMessage>
						</HStack>
						<Input {...field} type="number" maxLength={255} />
					</FormControl>
				)}
			</Field>
			<Field name="packageWidth">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.packageWidth && form.touched.packageWidth}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Width</FormLabel>
							<FormErrorMessage>{form.errors.packageWidth}</FormErrorMessage>
						</HStack>
						<Input {...field} type="number" maxLength={255} />
					</FormControl>
				)}
			</Field>
			<Field name="packageHeight">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.packageHeight && form.touched.packageHeight}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Height</FormLabel>
							<FormErrorMessage>{form.errors.packageHeight}</FormErrorMessage>
						</HStack>
						<Input {...field} type="number" />
					</FormControl>
				)}
			</Field>
		</HStack>
		<HStack>
			<Field name="packageWeight">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.packageWeight && form.touched.packageWeight}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Weight</FormLabel>
							<FormErrorMessage>{form.errors.packageWeight}</FormErrorMessage>
						</HStack>
						<Input {...field} type="number" maxLength={255} />
					</FormControl>
				)}
			</Field>

			<Field name="packageValue">
				{({ field, form }: any) => (
					<FormControl
						isInvalid={form.errors.packageValue && form.touched.packageValue}
					>
						<HStack justifyContent="space-between">
							<FormLabel>Total Package Value</FormLabel>
							<FormErrorMessage>{form.errors.packageValue}</FormErrorMessage>
						</HStack>
						<Input {...field} type="number" />
					</FormControl>
				)}
			</Field>
		</HStack>
		<SimpleGrid columns={2} spacing={4}>
			<Field name="isLithiumIncluded" type="checkbox">
				{({ field }: any) => (
					<FormControl>
						<Checkbox {...field}>Include Lithium Batteries</Checkbox>
					</FormControl>
				)}
			</Field>
			<Field name="isDryIceIncluded" type="checkbox">
				{({ field }: any) => (
					<FormControl>
						<Checkbox {...field}>Include Dry Ice (+$)</Checkbox>
					</FormControl>
				)}
			</Field>
			<Field name="isSignatureIncluded" type="checkbox">
				{({ field }: any) => (
					<FormControl>
						<Checkbox {...field}>Signature Options (+$)</Checkbox>
					</FormControl>
				)}
			</Field>
			<Field name="isOversizedPackageIncluded" type="checkbox">
				{({ field }: any) => (
					<FormControl>
						<Checkbox {...field}>Oversized Package (+$)</Checkbox>
					</FormControl>
				)}
			</Field>
		</SimpleGrid>
	</Stack>
);

export default WhatForm;
