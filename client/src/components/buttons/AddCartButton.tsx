import Auth from "../../util/auth";
import { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import { Item } from "../../types/ItemTypes";
import { useAddToCart, useDeleteFromCart } from "../../hooks/cartHooks";

function AddCartButton({ item }: { item: Item }) {
  // get the current user's cart
  const [cart, setCart] = useCartContext();
  const addToCart = useAddToCart();
  const deleteFromCart = useDeleteFromCart();

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    const payload = Auth.getPayload();
    userId = payload?.userId;
  }

  // create a set of cartIds to lookup when mapping over items below, more performant than looping again
  const cartIds = new Set();
  cart.forEach((cartItem: Item) => cartIds.add(cartItem.id));

  const handleAddCartClick = async () => {
    setLoading(true);

    await addToCart(item);

    setLoading(false);
  };

  // rendering a different button under different conditions
  let button;

  if (item.sold) {
    button = <Text>Sold</Text>; // item is sold, render "sold" button
    return button;
  }

  if (item.userId === userId) {
    button = <Text>My item</Text>; // item belongs to logged in user, render "my item" button
    return button;
  }

  if (cartIds.has(item.id)) {
    button = (
      <Button
        onClick={() => deleteFromCart(item.id)}
        colorScheme="red"
        width="full">
        Remove from cart
      </Button>
    ); // item is in cart, return "remove from cart button"
    return button;
  }

  if (!cartIds.has(item.id)) {
    // item is not in cart, return "add to cart button"
    button = (
      <Button onClick={handleAddCartClick} colorScheme="blue" width="full">
        {loading ? "adding to your cart..." : "Add to cart"}
      </Button>
    );
    return button;
  }

  // return button;
}

export default AddCartButton;
