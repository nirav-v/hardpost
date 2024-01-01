import Auth from "../util/auth";
import { useCartContext } from "../context/CartContext";
import { cartApi } from "../api/cartApi";
import { Item } from "../types/ItemTypes";

export const useDeleteFromCart = () => {
  // accessing context at top level of this custom hook -> can delete cart items from multiple locations within the app
  const [cart, setCart] = useCartContext();
  return async (itemId: number) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // util function that makes api request to delete item from logged in user's cart
    if (Auth.isLoggedIn()) await cartApi.deleteCartItem(itemId);
  };
};

export const useAddToCart = () => {
  const [cart, setCart] = useCartContext();
  return async (item: Item) => {
    // update local cart state, set in localStorage
    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    // if logged in, make api call to update user's cart in db
    if (Auth.isLoggedIn()) await cartApi.addCartItem(item.id);
  };
};
