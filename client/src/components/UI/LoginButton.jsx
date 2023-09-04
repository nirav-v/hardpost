import { Button, ButtonGroup } from "@chakra-ui/react";

import React from "react";

const LoginButton = ({ onClick, children }) => {
  return (
    <Button onClick={onClick} colorScheme="green">
      {children}
    </Button>
  );
};

export default LoginButton;
