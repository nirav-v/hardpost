import Auth from './util/auth';
import AddItemForm from './components/forms/AddItemForm1';
import CartPage from './pages/CartPage';
import SignUpForm from './components/forms/SignUpForm';
import SingleItemPage from './pages/SingleItemPage';
import ShopPage from './pages/ShopPage';
import LoginForm from './components/forms/LoginForm';
import OrdersPage from './pages/OrdersPage';
import UserItems from './pages/UserItems';
import NavBar from './components/UI/NavBar';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
// import { ItemsProvider } from './context/ItemsContext';
import LogoutButton from './components/buttons/LogoutButton';
import { Button, Box, Container, useColorMode, Flex } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import CartProvider from './context/CartContext';
import WelcomeModal from './components/modals/WelcomeModal';
import ButtonModal from './components/modals/ButtonModal';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import GoogleLoginButton from "./components/buttons/GoogleLoginButton";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  // react query to be passed tp app via context provider
  const queryClient = new QueryClient();

  const [showSignUpForm, setShowSignUpForm] = useState(!Auth.returningUser());

  // first check is we have a returning user

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (Auth.isLoggedIn()) setLoggedIn(true);
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    // reload the homepage, needed to trigger check loggedIn check
    window.location.replace(window.location.origin);
  };

  // console.log(import.meta.env);
  return (
    <Fragment>
      {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}> */}
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CartProvider>
          <Flex justifyContent="right" mr={2}>
            <Button mr={0} onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {/* conditionally render log out button */}
            {loggedIn ? (
              <Box>
                <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>{' '}
              </Box>
            ) : null}
          </Flex>
          <NavBar loggedIn={loggedIn} />

          {/* <ItemsProvider> */}
          {/* conditionally render remaining content of App (accessible react-router routes and components) based on loggedIn state */}
          {!loggedIn && (
            <div>
              <Container centerContent>
                {Auth.returningUser() ? null : <WelcomeModal />}
                {/* <GoogleLoginButton /> */}
                <ButtonModal
                  chakraColor={'teal'}
                  buttonContent="Log In"
                  cypress="login-btn">
                  {/* conditionally render Login form OR Sign up form based on state */}
                  {showSignUpForm ? (
                    <SignUpForm
                      setLoggedIn={setLoggedIn}
                      showSignUpForm={showSignUpForm}
                      setShowSignUpForm={setShowSignUpForm}
                    />
                  ) : (
                    <LoginForm
                      setLoggedIn={setLoggedIn}
                      showSignUpForm={showSignUpForm}
                      setShowSignUpForm={setShowSignUpForm}
                    />
                  )}
                </ButtonModal>
              </Container>
            </div>
          )}
          {/* Outlet renders all child routes of App defined in createBrowserRouter */}
          <Outlet />
        </CartProvider>
      </QueryClientProvider>
      {/* </GoogleOAuthProvider> */}
    </Fragment>
  );
}

export default App;
