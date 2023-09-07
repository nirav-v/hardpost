import React, { useState, useEffect, createContext, useContext } from "react";

function CartContext({ children }) {
  const CartContext = createContext();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  console.log(cart);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
