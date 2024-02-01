// check if the user is logged in before rendering the children, if not navigate back to the base route

import { PropsWithChildren } from 'react';

import LoginDisplay from '../UI/LoginDisplay';
import { useUserContext } from '../../context/UserContext';
import { Box, Container } from '@chakra-ui/react';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useUserContext();

  if (!loggedIn) {
    return (
      <div>
        <Container maxW="2xl" centerContent>
          <Box paddingTop="4" maxW="md" fontSize={'25px'}>
            Please log in to view this page
          </Box>
          <LoginDisplay setLoggedIn={setLoggedIn} />;
        </Container>
      </div>
    );
  }
  return children;
}
