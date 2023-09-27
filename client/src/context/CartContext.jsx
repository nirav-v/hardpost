import Auth from "../util/auth";
import React, { useState, useEffect, createContext, useContext } from "react";

const CartContext = createContext([]);

export const useCartContext = () => useContext(CartContext);

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!Auth.isLoggedIn()) return;
    fetch("/api/cart", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, [Auth.isLoggedIn()]);
  console.log(cart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
