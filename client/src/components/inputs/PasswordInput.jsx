import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";

export default function PasswordInput({
  value,
  handleChange,
  handleSubmit,
  label,
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          value={value}
          onChange={handleChange}
          mb="8px"
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
    </FormControl>
  );
}
