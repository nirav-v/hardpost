import {
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
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
          <ModalCloseButton />
          <ModalHeader> Welcome to HardPost!</ModalHeader>

          <ModalBody>
            <Heading size="lg">First time users please read</Heading>
            <br />
            <Text fontSize="lg">
              This platform is still in development. Therefore, all current
              purchases and sales are simulated, and no actual orders and
              charges will be made. Please feel free to post and delete test
              items, add items to your cart, and navigate through the checkout
              process. Fake credit card numbers will be provided to test with.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleWelcomeClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
