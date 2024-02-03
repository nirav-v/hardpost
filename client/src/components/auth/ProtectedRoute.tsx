// check if the user is logged in before rendering the children, if not navigate back to the base route

import { PropsWithChildren } from 'react';

import LoginDisplay from '../UI/LoginDisplay';
import { useUserContext } from '../../context/UserContext';
import { Box, Container } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const [loggedIn, setLoggedIn] = useUserContext();

  const location = useLocation();
  const path = location.pathname;

  console.log(path);

  // switch the message user sees based on the page they attempt to view
  let message;
  switch (path) {
    case '/add-item':
      message = 'post an item';
      break;
    case '/user-items':
      message = 'view the items you have posted';
      break;
    case '/orders':
      message = 'view your order history';
      break;
  }

  if (!loggedIn) {
    return (
      <div>
        <Container maxW="2xl" centerContent>
          <Box paddingTop="4" maxW="md" fontSize={'25px'}>
            Please log in to {message}
          </Box>
          <LoginDisplay setLoggedIn={setLoggedIn} />;
        </Container>
      </div>
    );
  }
  return children;
}
