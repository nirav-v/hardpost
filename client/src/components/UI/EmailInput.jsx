import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

function EmailInput({ value, handleChange }) {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input value={value} type="email" onChange={handleChange} />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
}

export default EmailInput;
