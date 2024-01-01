import { cartApi } from "../api/cartApi.ts";
import { Item } from "../types/ItemTypes";
import Auth from "../util/auth.ts";
import React, { useState, useEffect, createContext, useContext } from "react";

// cart context will be the values returned from useState hook
type CartContextType = [Item[], React.Dispatch<React.SetStateAction<Item[]>>];

const CartContext = createContext<CartContextType>([[], () => {}]);

export const useCartContext = () => useContext(CartContext);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
  // console.log(cart);
  useEffect(() => {
    // get cart from local storage and update the cart, used for when user is not logged in
    const localCartData = localStorage.getItem("cart");
    const cart = localCartData ? JSON.parse(localCartData) : [];
    setCart(cart);

    // if user is logged in, get their cart items from database and update the cart
    if (Auth.isLoggedIn()) {
      cartApi.getCartItems().then((data) => setCart(data));
    }
  }, [Auth.isLoggedIn()]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
