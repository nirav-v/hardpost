import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

type ButtonModalProps = {
  children: React.ReactNode;
  buttonContent: string;
  chakraColor: string;
};

export default function ButtonModal({
  children,
  buttonContent,
  chakraColor,
}: ButtonModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button colorScheme={chakraColor} onClick={onOpen} m={4}>
        {buttonContent}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="80%" alignItems={"center"}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          {children}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
