import { Button, ButtonGroup } from "@chakra-ui/react";

import React from "react";

const LogoutButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} colorScheme="red">
      {children}
    </Button>
  );
};

export default LogoutButton;
