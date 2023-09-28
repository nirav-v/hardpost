import ShopPage from "./pages/ShopPage";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./components/forms/LoginForm";
import AddItemForm from "./components/forms/AddItemForm1";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import UserItems from "./pages/UserItems";
import NavBar from "./components/UI/NavBar";
import SingleItemPage from "./pages/SingleItemPage";
import { Routes, Route } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { ItemsProvider } from "./context/ItemsContext";
import LogoutButton from "./components/UI/LogoutButton";
import { Button, Container, useColorMode, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CartProvider from "./context/CartContext";
import Auth from "./util/auth";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [loggedIn, setLoggedIn] = useState(false);
  console.log("loggedIn ", loggedIn);
  console.log("Auth", Auth.isLoggedIn());

  useEffect(() => {
    if (Auth.isLoggedIn()) setLoggedIn(true);
  }, []);

  const [showSignUpForm, setShowSignUpForm] = useState(true);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Fragment>
      <CartProvider>
        <Flex justifyContent="right" mr={2}>
          <Button mr={0} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
        <NavBar loggedIn={loggedIn} handleLogoutClick={handleLogoutClick} />
        <ItemsProvider>
          {/* conditionally render remaining content of App (accessible react-router routes and components) based on loggedIn state */}
          {!loggedIn ? (
            <div>
              <Container centerContent>
                {/* conditionally render Login form OR Sign up form based on state */}
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
    </Fragment>
  );
}

export default App;
