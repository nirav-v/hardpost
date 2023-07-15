import { useState } from "react";

function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //   console.log(`username: ${userName}, email: ${email}, password: ${password}`);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // validate form inputs
    if (password.length > 0 && password === confirmPassword) {
      const url = "http://localhost:3000/api/user/signup";
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

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUserName("");

      console.log(response);
      console.log("signup request sent");
    }
  };

  const handleInputChange = (event, setter) => setter(event.target.value);

  return (
    <div>
      <p>SignUpForm</p>
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
          type="password"
          name="password"
          value={password}
          onChange={() => {
            handleInputChange(event, setPassword);
          }}
        />
        <label>confirm password</label>
        <input
          type="password"
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
