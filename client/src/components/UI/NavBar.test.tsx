import '@testing-library/jest-dom';
import ButtonModal from '../modals/ButtonModal';
import { BrowserRouter } from 'react-router-dom';
import CartProvider, { CartContext } from '../../context/CartContext';
import { expect } from '@jest/globals';
import NavBar from './NavBar';
import { render, fireEvent, screen } from '@testing-library/react';

describe('navbar tests', () => {
  it('renders navbar when not logged in', async () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={[[], () => {}]}>
          <NavBar loggedIn={false} />
        </CartContext.Provider>
      </BrowserRouter>
    );

    const navLinks = await screen.findAllByRole('link');
    expect(navLinks).toHaveLength(3);
  });
  it('renders navbar when logged in', async () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={[[], () => {}]}>
          <NavBar loggedIn={true} />
        </CartContext.Provider>
      </BrowserRouter>
    );

    const navLinks = await screen.findAllByRole('link');
    expect(navLinks).toHaveLength(6);
  });
});
