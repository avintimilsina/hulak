import PageLoadingSpinner from "@/components/shared/PageLoadingSpinner";
import Result from "@/components/shared/Result";
import InputField from "@/components/ui/InputField";
import Navbar from "@/components/ui/navbar";
import {
	Box,
	Button,
	HStack,
	Heading,
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
	Text,
	VStack,
	useSteps,
} from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import * as Yup from "yup";
import { db } from "../../firebase";

const TrackingPage = () => {
	const [trackingId, setTrackingId] = useState("");

	const [value, loading, error] = useDocumentData(
		doc(db, "orders", (trackingId || "-") as string),
		{
			snapshotListenOptions: { includeMetadataChanges: true },
		}
	);
	if (error) {
		<Result
			heading={error.name}
			type="error"
			text={error.message}
			dump={error.stack}
		/>;
	}

	return (
		<>
			<Navbar />
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
							<HStack
								alignItems="flex-end"
								gap={8}
								w="full"
								maxW={{ base: "unset", lg: "2xl" }}
							>
								<InputField label="Tracking Number" name="orderId" />
								<Button
									type="submit"
									isLoading={props.isSubmitting}
									colorScheme="brand"
								>
									Search
								</Button>
							</HStack>
							{loading ? (
								<PageLoadingSpinner />
							) : (
								value && <TrackingTimeline status={value?.status} />
							)}
						</VStack>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default TrackingPage;

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

interface TrackingTimelineProps {
	status: string;
	orientation?: "horizontal" | "vertical";
}

const TrackingTimeline = ({ status, orientation }: TrackingTimelineProps) => {
	const { activeStep, setActiveStep } = useSteps({
		index: steps.filter((step) => step.title === status)[0].index,
		count: steps.length,
	});
	useEffect(() => {
		setActiveStep(steps.filter((step) => step.title === status)[0].index);
	}, [setActiveStep, status]);
	return (
		<SimpleGrid placeItems="center" justifyContent="center" h="70vh" w="full">
			{status !== "RETURNED" ? (
				<Stepper
					size="lg"
					colorScheme="brand"
					w="full"
					maxW={{ base: "unset", lg: "2xl" }}
					orientation={orientation}
					index={activeStep}
					h="70vh"
					mx="4"
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

							<Box w="full">
								<StepTitle>{step.title}</StepTitle>
								{activeStep === index + 1 && (
									<StepDescription as={Text} textAlign="justify">
										{step.description}
									</StepDescription>
								)}
							</Box>

							<StepSeparator />
						</Step>
					))}
				</Stepper>
			) : (
				<Heading>Order Returned. Please Contact Support!</Heading>
			)}
		</SimpleGrid>
	);
};

TrackingTimeline.defaultProps = {
	orientation: "vertical",
};

export { TrackingTimeline };
