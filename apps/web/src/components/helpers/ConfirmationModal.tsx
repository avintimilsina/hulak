import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	ButtonProps,
	Text,
	VStack,
	FormLabel,
	HStack,
	Input,
} from "@chakra-ui/react";
import { useState } from "react";

// ConfirmationModalProps is a type where it defines the props of the ConfirmationModal component
interface ConfirmationModalProps extends ButtonProps {
	onSuccess: () => void;
	headerText: string;
	bodyText: string;
	confirmText?: string;
	colorScheme?: string;
}

// ConfirmationModal is a component where it allows the user to confirm an action
const ConfirmationModal = ({
	onSuccess,
	headerText,
	bodyText,
	confirmText,
	colorScheme,
	...rest
}: ConfirmationModalProps) => {
	// isOpen, onOpen, onClose are actions where it allows the user to open and close the modal
	const { isOpen, onOpen, onClose } = useDisclosure();

	// text is a state where it contains the text that the user has to type to confirm the action
	const [text, setText] = useState("");

	return (
		<>
			<Button onClick={onOpen} {...rest} colorScheme={colorScheme} />

			<Modal isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{headerText}</ModalHeader>
					<ModalCloseButton />
					<ModalBody as={VStack} alignItems="flex-start" pb={6}>
						<Text textAlign="left" my={2}>
							{bodyText}
						</Text>
						{confirmText && (
							<>
								<HStack justifyContent="space-between">
									<FormLabel m={0}>
										Type <strong>{confirmText}</strong> to confirm
									</FormLabel>
								</HStack>
								<Input
									required
									name="Confirm"
									placeholder={confirmText}
									value={text}
									onChange={(e) => setText(e.target.value)}
								/>
							</>
						)}
					</ModalBody>

					<ModalFooter gap={2}>
						<Button variant="outline" onClick={onClose}>
							Cancel
						</Button>
						{/* Action is passed to OnSuccess and it can be used to perform other actions in components */}
						<Button
							isDisabled={!!confirmText && text !== confirmText}
							colorScheme="red"
							onClick={() => {
								onSuccess();
								onClose();
							}}
						>
							Confirm
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

ConfirmationModal.defaultProps = {
	confirmText: "",
	colorScheme: "",
};

export default ConfirmationModal;
