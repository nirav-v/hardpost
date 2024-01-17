import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { ItemsProvider } from '../../context/ItemsContext';
// import CartProvider from '../../context/CartContext';
import CartProvider, { CartContext } from '../../context/CartContext';
import React from 'react';
import { expect, jest } from '@jest/globals';
import { cartApi } from '../../api/cartApi';
import Auth from '../../util/auth';

describe('placeholder', () => {
  it('is true', () => {
    expect(true).toBe(true);
  });
});

describe('shop page tests', () => {
  jest
    .spyOn(cartApi, 'getCartItems')
    .mockResolvedValue([{ name: 'mocked cart item' }]);

  // jest.spyOn(Auth, 'isLoggedIn').mockImplementation(() => true);

  it('renders product card', () => {
    const testItem = {
      category: 'test',
      description: 'test',
      id: 1,
      imagePath: 'test',
      price: 20,
      sold: false,
      user: {
        email: 'B@mail.com',
        id: 2,
        password:
          '$2b$10$DmTjWlA2SbxfezidRRQLluCf4ITZkX.ayyQD7Y6taxrVcajK1tMca',
        username: 'Birry',
      },
      userId: 2,
    };

    render(
      <BrowserRouter>
        <CartProvider>
          <ProductCard item={testItem} />
        </CartProvider>
      </BrowserRouter>
    );
  });
});
