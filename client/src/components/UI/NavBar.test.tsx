import '@testing-library/jest-dom';
import ButtonModal from '../modals/ButtonModal';
import { BrowserRouter } from 'react-router-dom';
import CartProvider, { CartContext } from '../../context/CartContext';
import { expect } from '@jest/globals';
import NavBar from './NavBar';
import { render, fireEvent, screen } from '@testing-library/react';

describe('navbar tests', () => {
  it('renders navbar ', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={[[], () => {}]}>
          <NavBar loggedIn={false} />
        </CartContext.Provider>
      </BrowserRouter>
    );
  });
});
