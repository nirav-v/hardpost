import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import UserItems from "./components/pages/UserItems";
import NavBar from "./components/NavBar";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);

  const checkAuth = async () => {
    const response = await fetch("/api/user/login");
    const result = await response.json();
    console.log(result);
    if (result.userId) setLoggedIn(true);
  };
  useEffect(() => {
    if (localStorage.getItem("currentUserId")) setLoggedIn(true);
    checkAuth();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("currentUserId");
    fetch("/api/user/logout").then((res) => res.json());
    window.location.reload();
  };

  return (
    <div>
      <NavBar />
      {!loggedIn ? (
        <div>
          <LoginForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <SignUpForm loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      ) : (
        <div>
          <button onClick={handleLogoutClick}>Logout</button>

          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/add-item" element={<AddItemForm />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/user-items" element={<UserItems />} />
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
