import { Box, Button } from '@chakra-ui/react';
import { useUserContext } from '../../context/UserContext';

type LogoutButtonProps = {
  children: React.ReactNode;
};

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const [loggedIn, setLoggedIn] = useUserContext();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    // reload the homepage, needed to trigger check loggedIn check
    window.location.replace(window.location.origin);
  };

  return (
    <>
      {loggedIn && (
        <Box>
          <Button
            onClick={handleLogoutClick}
            colorScheme="red"
            data-cy="logout-btn">
            {children}
          </Button>{' '}
        </Box>
      )}
    </>
  );
};

export default LogoutButton;
