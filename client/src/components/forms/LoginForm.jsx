import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = "http://localhost:3000/api/user/login";
    const body = JSON.stringify({
      email: email,
      password: password,
    }); // request body can only be sent as a string, parsed back to object by the server
    console.log("body: ", body);
    // send post request to server
    const request = await fetch(url, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json", // tells server that data is in json format
      },
    });

    const response = await request;
    console.log(response);

    setEmail("");
    setPassword("");

    console.log("login request sent");
  };

  const handleInputChange = (event, setter) => setter(event.target.value);

  return (
    <div>
      <p> LoginForm</p>
      <form>
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

        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
