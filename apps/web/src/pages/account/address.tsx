import AddressSection from "@/components/pages/account/address/Address";
import AddressForm from "@/components/pages/account/address/AddressForm";
import ModalButton from "@/components/ui/ModalButton";
import withProtected from "@/routes/withProtected";
import { Stack } from "@chakra-ui/react";
import { useRef } from "react";
import { IoAdd } from "react-icons/io5";

// ? AddressPage is a page where the user can add their addresses

const AddressPage = () => {
	// useRef is a react hook where it allows the user to reference a component
	const modalRef: any = useRef();

	// closeModal is a function where it closes the modal
	const closeModal = () => {
		if (modalRef.current) {
			modalRef.current.closeModal();
		}
	};

	return (
		<Stack as="section" spacing="6" maxW="3xl" my={8}>
			<Stack
				gap={4}
				alignItems={{ base: "center", md: "flex-end" }}
				justifyContent="space-between"
				direction={{ base: "column", md: "row" }}
			>
				{/* ModalButton opens the modal with AddressForm to input users address */}
				<ModalButton
					ref={modalRef}
					colorScheme="brand"
					leftIcon={<IoAdd />}
					w={{ base: "full", md: "unset" }}
					buttonText="Add Address"
					modalHeader="Add Address"
					modalFooter=" "
				>
					<AddressForm onSubmissionSuccess={closeModal} />
				</ModalButton>
			</Stack>

			{/* AddressSection is a component that allows the user to view their addresses */}
			<AddressSection />
		</Stack>
	);
};

export default withProtected(AddressPage);
