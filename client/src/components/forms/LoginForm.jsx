import { useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import PasswordInput from "../UI/PasswordInput";
import EmailInput from "../UI/EmailInput";

function LoginForm({ loggedIn, setLoggedIn }) {
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

  const handleInputChange = (event, setter) => setter(event.target.value);

  return (
    <div>
      <p>please log in</p>
      {!loginSuccess && <p style={{ color: "red" }}>Incorrect credentials</p>}
      <form onSubmit={handleSubmit}>
        <EmailInput
          value={email}
          handleChange={() => {
            handleInputChange(event, setEmail);
          }}
          handleSubmit={handleSubmit}
        />
        <PasswordInput
          label="Password"
          type="password"
          name="password"
          value={password}
          handleChange={() => {
            handleInputChange(event, setPassword);
          }}
        />
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
