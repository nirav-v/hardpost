import { useState } from "react";

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
      <p>SignUpForm</p>
      <p style={{ color: "red" }}>{errorMessage}</p>
      <form>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={userName}
          onChange={() => {
            handleInputChange(event, setUserName);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={() => {
            handleInputChange(event, setEmail);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={() => {
            handleInputChange(event, setPassword);
          }}
        />
        <label>confirm password</label>
        <input
          type="text"
          value={confirmPassword}
          onChange={() => {
            handleInputChange(event, setConfirmPassword);
          }}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
