import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
} from "@chakra-ui/react";

type EmailInputProps = {
  value?: string;
  handleEmailChange: (event: React.FormEvent<HTMLInputElement>) => void;
};

function EmailInput({ value, handleEmailChange }: EmailInputProps) {
  return (
    <FormControl mb="8px">
      <FormLabel>Email address</FormLabel>
      <Input
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
