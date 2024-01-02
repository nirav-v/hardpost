import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import PasswordInput from "../inputs/PasswordInput";
import EmailInput from "../inputs/EmailInput";
import Auth from "../../util/auth";
import { userApi } from "../../api/userApi";

type LoginFormProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  showSignUpForm: boolean;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
};

function LoginForm({
  setLoggedIn,
  showSignUpForm,
  setShowSignUpForm,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // make api request to log user in
    const token = await userApi.login({ email, password });
    if (token) {
      Auth.login(token); // set token in local storage
      setEmail("");
      setPassword("");
      setLoggedIn(true);
    } else {
      setLoginSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "16" }}
        px={{ base: "0", sm: "8" }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>
                Log in to your account
              </Heading>
              <Text color="fg.muted">
                Don't have an account?{" "}
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowSignUpForm(!showSignUpForm);
                  }}>
                  Sign up
                </Button>
              </Text>
            </Stack>
          </Stack>
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={{ base: "transparent", sm: "bg.surface" }}
            boxShadow={{ base: "none", sm: "md" }}
            borderRadius={{ base: "none", sm: "xl" }}>
            <Stack spacing="6">
              <Stack spacing="5">
                <EmailInput
                  handleEmailChange={(event) =>
                    setEmail(event.currentTarget.value)
                  }
                />
                <PasswordInput
                  name="password"
                  value={password}
                  handleChange={(event) =>
                    setPassword(event.currentTarget.value)
                  }
                />
              </Stack>
              <HStack justify="space-between">
                {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
                {!loginSuccess && (
                  <p style={{ color: "red" }}>Incorrect credentials</p>
                )}
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button type="submit" colorScheme="cyan">
                  Log in
                </Button>
                <HStack>
                  <Divider />
                  {/* <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider /> */}
                </HStack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </form>
  );
}

export default LoginForm;
