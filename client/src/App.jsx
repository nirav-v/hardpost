import ShopPage from "./components/pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";
import CartPage from "./components/pages/CartPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import OrdersPage from "./components/pages/OrdersPage";
import UserItems from "./components/pages/UserItems";
import NavBar from "./components/UI/NavBar";
import SingleItemPage from "./components/pages/SingleItemPage";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ItemsProvider } from "./util/ItemsContext";
import LogoutButton from "./components/UI/LogoutButton";
import { Button, Container } from "@chakra-ui/react";
import CartProvider from "./util/CartContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);

  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const checkAuth = async () => {
    const response = await fetch("/api/user/login");
    const result = await response.json();
    console.log(result);
    if (result.userId) {
      setLoggedIn(true);
    } else {
      localStorage.removeItem("currentUserId");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("currentUserId")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    checkAuth();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("currentUserId");
    fetch("/api/user/logout").then((res) => res.json());
    window.location.reload();
  };

  console.log("showSignUpForm", showSignUpForm);

  return (
    <div>
      <CartProvider>
        <NavBar loggedIn={loggedIn} handleLogoutClick={handleLogoutClick} />
        <ItemsProvider>
          {!loggedIn ? (
            <div>
              <Container centerContent>
                {!showSignUpForm ? (
                  <LoginForm
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    showSignUpForm={showSignUpForm}
                    setShowSignUpForm={setShowSignUpForm}
                  />
                ) : (
                  <SignUpForm
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    showSignUpForm={showSignUpForm}
                    setShowSignUpForm={setShowSignUpForm}
                  />
                )}
              </Container>
              <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route
                  path="/single-item/:itemId"
                  element={<SingleItemPage />}
                />
              </Routes>
            </div>
          ) : (
            <div>
              <Routes>
                <Route path="/" element={<ShopPage />} />
                <Route path="/add-item" element={<AddItemForm />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/user-items" element={<UserItems />} />
                <Route
                  path="/single-item/:itemId"
                  element={<SingleItemPage />}
                />
              </Routes>
            </div>
          )}
        </ItemsProvider>
      </CartProvider>
    </div>
  );
}

export default App;
