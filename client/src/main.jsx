import './styles/main.css';
import React, { Children, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute.tsx';
import ShopPage from './pages/ShopPage/index.tsx';
import CartPage from './pages/CartPage/index.tsx';
import SingleItemPage from './pages/SingleItemPage/index.tsx';
import AddItemForm from './components/forms/AddItemForm1';
import OrdersPage from './pages/OrdersPage/index.tsx';
import ErrorPage from './pages/ErrorPage/index.tsx';
import UserItems from './pages/UserItemsPage/index.tsx';
import UserProvider from './context/UserContext.tsx';

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};
// to use Chakra breakpoints, pass array of values to any style prop. Index of each value maps to breakpoint in this object. See https://chakra-ui.com/docs/features/responsive-styles#using-the-breakpoint-props
const breakpoints = {
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
};

// 3. extend the theme
const theme = extendTheme({ config, breakpoints });

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <ShopPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: 'single-item/:itemId', element: <SingleItemPage /> },
      {
        path: '/orders',
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'user-items',
        element: (
          <ProtectedRoute>
            <UserItems />
          </ProtectedRoute>
        ),
      },
      {
        path: 'add-item',
        element: (
          <ProtectedRoute>
            <AddItemForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

let router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <ChakraProvider theme={theme}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ChakraProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
