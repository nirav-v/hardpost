import { useState } from "react";
import PasswordInput from "../UI/PasswordInput";
import EmailInput from "../UI/EmailInput";
import { Button, Input, Text } from "@chakra-ui/react";

function SignUpForm({ loggedIn, setLoggedIn }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //   console.log(`username: ${userName}, email: ${email}, password: ${password}`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate form inputs
    if (password.length < 8) {
      setErrorMessage("password must be more than 8 characters");
    } else if (password !== confirmPassword) {
      setErrorMessage("passwords do not match");
    } else {
      const url = "/api/user/signup";
      const body = JSON.stringify({
        username: userName,
        email: email,
        password: password,
      }); // request body can only be sent as a string, parsed back to object by the server
      console.log("body: ", body);
      // send post request to server
      const response = await fetch(url, {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json", // tells server that data is in json format
        },
      });

      console.log(response);
      const result = await response.json();
      console.log(result);

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
      console.log("loggedIn: ", loggedIn);
      console.log("signup request sent");
    }
  };

  const handleInputChange = (event, setter) => setter(event.target.value);

  return (
    <div>
      <p>Sign up with the form below</p>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <Text mb="8px">Username: </Text>

        <Input
          type="text"
          name="name"
          placeholder="username"
          value={userName}
          onChange={() => {
            handleInputChange(event, setUserName);
          }}
        />
        <EmailInput
          value={email}
          handleChange={() => {
            handleInputChange(event, setEmail);
          }}
        />
        <PasswordInput
          label="Password"
          value={password}
          handleChange={() => {
            handleInputChange(event, setPassword);
          }}
        />
        <label>confirm password</label>
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          handleChange={() => {
            handleInputChange(event, setConfirmPassword);
          }}
        />
        <Button type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUpForm;
