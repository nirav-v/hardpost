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
import PasswordInput from "../UI/PasswordInput";
import EmailInput from "../UI/EmailInput";

function LoginForm({
  loggedIn,
  setLoggedIn,
  showSignUpForm,
  setShowSignUpForm,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginSuccess, setLoginSuccess] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "/api/user/login";
    const body = JSON.stringify({
      email: email,
      password: password,
    }); // request body can only be sent as a string, parsed back to object by the server
    // send post request to server

    const response = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json", // tells server that data is in json format
      },
    });

    console.log(response);
    if (response.status === 200) {
      setLoggedIn(true);
      const loginResult = await response.json();
      console.log(loginResult);
      localStorage.setItem("currentUserId", loginResult.userId);
      setEmail("");
      setPassword("");
    } else {
      setLoginSuccess(false);
    }

    console.log("login request sent");
  };

  const handleInputChange = (event, setState) => setState(event.target.value);

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
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowSignUpForm(!showSignUpForm);
                  }}>
                  Sign up
                </button>
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
                  handleEmailChange={(event) => setEmail(event.target.value)}
                />
                <PasswordInput
                  name="password"
                  value={password}
                  handleChange={(event) => setPassword(event.target.value)}
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
                <Button type="submit">Log in</Button>
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
