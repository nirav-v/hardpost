import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
} from "@chakra-ui/react";

export default function PasswordInput({ value, onChange }) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup size="md">
      <FormLabel>Password</FormLabel>

      <Input
        value={value}
        onChange={onChange}
        pr="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
