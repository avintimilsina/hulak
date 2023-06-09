import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Progress,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiCloudUpload } from "react-icons/hi";
import { auth, storage } from "../../../firebase";
import PageLoadingSpinner from "../shared/PageLoadingSpinner";

// ? FileUploadModal is the component that pops up when you click the "Change photo" button in the AccountSetting page.
interface FileUploadModalProps {
	onUpload: (url: string) => void;
	imageRef: string;
}
const FileUploadModal = ({ onUpload, imageRef }: FileUploadModalProps) => {
	const {
		isOpen: isUploadFileModalOpen,
		onOpen: onUploadFileModalOpen,
		onClose: onUploadFileModalClose,
	} = useDisclosure();

	// This is the progress bar that shows the progress of the file upload.
	const [fileUploadProgress, setFileUploadProgress] = useState(0);

	// This is the file that is selected by the user.
	const [selectedFile, setSelectedFile] = useState<File | undefined>();
	const toast = useToast();
	const [, loading, userError] = useAuthState(auth);
	if (loading) {
		return <PageLoadingSpinner />;
	}
	if (userError) {
		return <PageLoadingSpinner />;
	}
	return (
		<>
			<Button
				colorScheme="green"
				leftIcon={<HiCloudUpload />}
				onClick={onUploadFileModalOpen}
			>
				Change photo
			</Button>
			<Modal
				preserveScrollBarGap
				isOpen={isUploadFileModalOpen}
				onClose={onUploadFileModalClose}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Upload a Picture</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input
							type="file"
							onChange={(e) => setSelectedFile(e?.target.files?.[0])}
							border={0}
						/>
						{/* Displays the progress of the file upload using the Progress component from Chakra UI. */}
						<Progress size="xs" value={fileUploadProgress} />
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="red"
							variant="outline"
							mr={3}
							onClick={onUploadFileModalClose}
						>
							Close
						</Button>
						<Button
							isLoading={fileUploadProgress > 0}
							colorScheme="green"
							onClick={async () => {
								// the uploadBytesResumable function uploads the file to the firebase storage where it is stored under the imageRef path.
								const uploadTask = uploadBytesResumable(
									ref(storage, imageRef),
									selectedFile!
								);

								uploadTask.on(
									"state_changed",
									(snapshot) => {
										// Set the progress bar to the percentage of the file that has been uploaded.
										setFileUploadProgress(
											Math.round(
												(snapshot.bytesTransferred / snapshot.totalBytes) * 100
											)
										);
									},
									(error) =>
										toast({
											title: "An Error Occurred",
											description: error.message,
											status: "error",
											duration: 5000,
											isClosable: true,
										}),
									async () => {
										// When the upload is complete, get the download URL of the image of the user and set it as the user's profile picture.
										await getDownloadURL(ref(storage, imageRef)).then(
											(downloadURL) => {
												onUpload(downloadURL);
												onUploadFileModalClose();
												setSelectedFile(undefined);
												// Reset the progress bar to 0.
												setFileUploadProgress(0);
											}
										);
									}
								);
							}}
						>
							Upload
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default FileUploadModal;
