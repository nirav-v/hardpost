import Auth from './util/auth';
import NavBar from './components/UI/NavBar';
import { Outlet } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
// import { ItemsProvider } from './context/ItemsContext';
import LogoutButton from './components/buttons/LogoutButton';
import { Button, Box, Container, useColorMode, Flex } from '@chakra-ui/react';
import CartProvider from './context/CartContext';
import WelcomeModal from './components/modals/WelcomeModal';
import ButtonModal from './components/modals/ButtonModal';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ColorModeBtn from './components/buttons/colorModeBtn';
import LoginDisplay from './components/UI/LoginDisplay';
import { useUserContext } from './context/UserContext';
import LoginModal from './components/modals/LoginModal';

function App() {
  // react query to be passed tp app via context provider
  const queryClient = new QueryClient();

  const [loggedIn, setLoggedIn] = useUserContext();
  // check for valid token in local storage to remember user is logged in
  useEffect(() => {
    if (Auth.isLoggedIn()) setLoggedIn(true);
  }, []);

  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CartProvider>
          <NavBar loggedIn={loggedIn} />
          {/* Outlet renders all child routes of App defined in createBrowserRouter */}
          <Outlet />
        </CartProvider>
      </QueryClientProvider>
    </Fragment>
  );
}

export default App;
