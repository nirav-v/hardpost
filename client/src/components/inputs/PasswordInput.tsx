import React, { useState } from 'react';
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';

type PasswordInputProps = {
  name: string;
  value: string;
  label?: string;
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  name,
  value,
  handleChange,
  label,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          name={name}
          value={value}
          onChange={handleChange}
          mb="8px"
          pr="4.5rem"
          type={show ? 'text' : 'password'}
          placeholder="Enter password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
}
