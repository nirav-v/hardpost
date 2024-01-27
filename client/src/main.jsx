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
import ShopPage from './pages/ShopPage/index.tsx';
import CartPage from './pages/CartPage/index.tsx';
import SingleItemPage from './pages/SingleItemPage.tsx';
import Auth from './util/auth.ts';
import OrdersPage from './pages/OrdersPage.tsx';
import UserItems from './pages/UserItems.tsx';

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
    children: [
      { path: '/', element: <ShopPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: 'single-item/:itemId', element: <SingleItemPage /> },
      { path: '/orders', element: <OrdersPage /> },
      { path: 'user-items', element: <SingleItemPage /> },
    ],
  },
];

let router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
