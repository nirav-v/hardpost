import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";

import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/user/login");
      const result = await response.json();
      console.log(result);
      if (result.data.userId) setLoggedIn(true);
    };
    checkAuth();
  }, []);

  // conditionally render login and sign up forms based on loggedIn state
  let loginForm;
  let signUpForm;
  if (!loggedIn) {
    loginForm = <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
    signUpForm = <SignUpForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
  }

  return (
    <div>
      {loggedIn ? <a href="api/user/logout">Logout</a> : null}
      {loginForm}
      {signUpForm}
      <AddItemForm />
      <ShopPage />;
    </div>
  );
}

export default App;
