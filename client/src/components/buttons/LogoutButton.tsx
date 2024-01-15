import { Button } from '@chakra-ui/react';

type LogoutButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const LogoutButton = ({ onClick, children }: LogoutButtonProps) => {
  return (
    <Button onClick={onClick} colorScheme="red" data-cy="logout-btn">
      {children}
    </Button>
  );
};

export default LogoutButton;
