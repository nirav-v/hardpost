import Auth from "../util/auth";
import { useCartContext } from "../context/CartContext";
import { deleteCartItem } from "../util/cartApi";

export const useDeleteFromCart = () => {
  // accessing context at top level of this custom hook -> can delete cart items from multiple locations within the app
  const [cart, setCart] = useCartContext();
  return async (itemId: number) => {
    if (!Auth.isLoggedIn()) {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return;
    }
    // util function that makes api request to delete item from logged in user's cart
    const updatedItems = await deleteCartItem(itemId);
    setCart(updatedItems);
  };
};
