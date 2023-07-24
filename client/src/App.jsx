import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import UserItems from "./components/pages/UserItems";

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

  return (
    <div>
      {!loggedIn ? (
        <div>
          <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <SignUpForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      ) : (
        <div>
          <a href="api/user/logout">Logout</a>
          <AddItemForm />
          <CartPage />
          <OrdersPage />
          <UserItems />
        </div>
      )}
      <ShopPage />;
    </div>
  );
}

export default App;
