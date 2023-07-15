import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";

import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);

  return (
    <div>
      <SignUpForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <ShopPage />;
    </div>
  );
}

export default App;
