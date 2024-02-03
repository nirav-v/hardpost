import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Flex
      height="100vh"
      gap={'5%'}
      flexDirection={'column'}
      align="center"
      justify="center"
      id="error-page">
      <Heading display="block">Bruh</Heading>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Sorry, an unexpected error has occurred.</AlertTitle>
        <AlertDescription>
          <i>{error.statusText || error.message}</i>
        </AlertDescription>
      </Alert>
    </Flex>
  );
}
