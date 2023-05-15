import InputField from "@/components/ui/InputField";
import {
	Box,
	Button,
	HStack,
	SimpleGrid,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	VStack,
	useSteps,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as Yup from "yup";
import { doc } from "firebase/firestore";
import Result from "@/components/shared/Result";
import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import { db } from "../../firebase";

const steps = [
	{
		index: 1,
		title: "PLACED",
		description: "The order is confirmed and the payment is processed.",
	},
	{
		index: 2,
		title: "PICKED",
		description: "The order is picked up from the sender.",
	},
	{
		index: 3,
		title: "SHIPPED",
		description: "The order has left the sender location.",
	},
	{
		index: 4,
		title: "OUTFORDELIVERY",
		description:
			"Look out for the delivery guy. Your's order is out for delivery",
	},
	{
		index: 5,
		title: "DELIVERED",
		description:
			"Its delivered. If you are still checking here, go check your mail",
	},
];

const TrackingPage = () => {
	const [trackingId, setTrackingId] = useState("");

	const [value, loading, error] = useDocumentData(
		doc(db, "orders", (trackingId || "-") as string),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);

	const { activeStep, setActiveStep } = useSteps({
		index: 0,
		count: steps.length,
	});

	useEffect(() => {
		if (value) {
			setActiveStep(
				steps.filter((step) => step.title === value.status)[0].index
			);
		}
	}, [setActiveStep, value]);

	if (error) {
		<Result
			heading={error.name}
			type="error"
			text={error.message}
			dump={error.stack}
		/>;
	}

	return (
		<Formik
			initialValues={{
				orderId: "",
			}}
			validationSchema={Yup.object({
				orderId: Yup.string().required("Required"),
			})}
			onSubmit={async (values, actions) => {
				setTrackingId(values.orderId);
				actions.setSubmitting(false);
			}}
		>
			{(props: FormikProps<any>) => (
				<Form>
					<VStack m={8} gap={8}>
						<HStack alignItems="flex-end" gap={8} w="2xl">
							<InputField label="Tracking Number" name="orderId" />
							<Button type="submit" isLoading={props.isSubmitting}>
								Search
							</Button>
						</HStack>
						{loading ? (
							<PageLoadingSpinner />
						) : (
							value && (
								<SimpleGrid
									placeItems="center"
									justifyContent="center"
									h="70vh"
									w="full"
								>
									<Stepper
										size="lg"
										colorScheme="red"
										w="full"
										orientation="vertical"
										index={activeStep}
										h="70vh"
									>
										{steps.map((step, index) => (
											<Step key={`step-${index + 1}`}>
												<StepIndicator>
													<StepStatus
														complete={<StepIcon />}
														incomplete={<StepNumber />}
														active={<StepNumber />}
													/>
												</StepIndicator>

												<Box flexShrink="0">
													<StepTitle>{step.title}</StepTitle>
													{activeStep === index + 1 && (
														<StepDescription>
															{step.description}
														</StepDescription>
													)}
												</Box>

												<StepSeparator />
											</Step>
										))}
									</Stepper>
								</SimpleGrid>
							)
						)}
					</VStack>
				</Form>
			)}
		</Formik>
	);
};

export default TrackingPage;
