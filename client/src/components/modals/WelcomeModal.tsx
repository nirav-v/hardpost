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
} from '@chakra-ui/react';
import { useEffect } from 'react';

export default function WelcomeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // immediately render modal only when component first mounts
  useEffect(() => {
    onOpen();
  }, []);

  // on modal close we want to also set a value in localStorage to remember they are a returning user
  const handleWelcomeClose = () => {
    onClose();
    localStorage.setItem('returningUser', true.toString());
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader textAlign={'center'}> Welcome to HardPost!</ModalHeader>

          <ModalBody>
            <Heading size="lg">
              We noticed you might be new here so please read the following
            </Heading>
            <br />
            <Text fontSize="lg">
              This platform is still in development. Therefore, all current
              purchases and sales are simulated, and no actual orders and
              charges will be made. To see the full functionality, please
              login/signup with a fake email, feel free to post and delete test
              items, add items to your cart, and navigate through the checkout
              process. Dummy credit card numbers are provided for the Stripe
              checkout page.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleWelcomeClose}
              data-cy="close-btn">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
