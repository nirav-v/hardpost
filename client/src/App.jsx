import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";

import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);

  // conditionally render login and sign up forms based on loggedIn state
  let loginForm;
  let signUpForm;
  if (!loggedIn) {
    loginForm = <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
    signUpForm = <SignUpForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  }

  return (
    <div>
      {loggedIn ? <p>logged in</p> : null}
      {loginForm}
      {signUpForm}
      <AddItemForm />
      <ShopPage />;
    </div>
  );
}

export default App;
