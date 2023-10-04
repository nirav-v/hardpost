import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function WelcomeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // immediately render modal only when component first mounts
  useEffect(() => {
    onOpen();
  }, []);

  // on modal close we want to also set a value in localStorage to remember they are a returning user
  const handleWelcomeClose = () => {
    onClose();
    localStorage.setItem("returningUser", true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Welcomen </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleWelcomeClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
