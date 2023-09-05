import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

function EmailInput({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel>Email address</FormLabel>
      <Input value={value} type="email" onChange={onChange} />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
}

export default EmailInput;
