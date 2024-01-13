import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

type EmailInputProps = {
  value?: string;
  handleEmailChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

function EmailInput({ value, handleEmailChange }: EmailInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <FormControl mb="8px">
      <FormLabel>Email address</FormLabel>
      <Input
        name="email"
        ref={inputRef}
        value={value}
        type="email"
        onChange={handleEmailChange}
        placeholder="email"
      />
      <FormHelperText>We'll never share your email.</FormHelperText>
    </FormControl>
  );
}

export default EmailInput;
