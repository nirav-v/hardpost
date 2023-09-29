import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import PasswordInput from "../inputs/PasswordInput";
import EmailInput from "../inputs/EmailInput";
import Auth from "../../util/auth";

function SignUpForm({
  loggedIn,
  setLoggedIn,
  showSignUpForm,
  setShowSignUpForm,
}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate form inputs
    if (password.length < 8) {
      setErrorMessage("password must be more than 8 characters");
    } else if (password !== confirmPassword) {
      setErrorMessage("passwords do not match");
    } else {
      // send sign up post request to server, // request body can only be sent as a string, parsed back to object by the server
      const response = await fetch("/api/user/signup", {
        method: "POST",
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json", // tells server that data is in json format
        },
      });

      // token sent back from api and set in localStorage
      const token = await response.json();
      Auth.login(token);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUserName("");

      if (response.status === 201) {
        setLoggedIn(true);
      } else {
        setErrorMessage(
          "Account creation failed, please ensure you used a valid email and that your passwords match"
        );
      }
    }
  };

  const handleInputChange = (event, setter) => setter(event.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxW="lg"
        py={{ base: "12", md: "16" }}
        px={{ base: "0", sm: "8" }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
              <Heading size={{ base: "xs", md: "sm" }}>Welcome</Heading>
              <Text fontSize="md">
                Please create an account, or simply browse items below
              </Text>

              <Text color="fg.muted">
                Already have an account?{" "}
                <Button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowSignUpForm(!showSignUpForm);
                  }}>
                  Log in
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
                <FormLabel>Username: </FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="username"
                  mb="8px"
                  value={userName}
                  onChange={(event) => {
                    setUserName(event.target.value);
                  }}
                />
                <EmailInput
                  handleEmailChange={(event) => setEmail(event.target.value)}
                />
                <PasswordInput
                  name="password"
                  value={password}
                  handleChange={(event) => setPassword(event.target.value)}
                />
                <PasswordInput
                  name="confirmPassword"
                  value={confirmPassword}
                  handleChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                />
              </Stack>
              <HStack justify="space-between">
                {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
                <Button variant="text" size="sm">
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Text color="red">{errorMessage}</Text>
                <Button type="submit" colorScheme="cyan">
                  Sign Up
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

export default SignUpForm;
