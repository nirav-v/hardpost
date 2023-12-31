import Auth from "../../util/auth";
import { addCartItem, deleteCartItem } from "../../util/cartApi";
import React, { useState } from "react";
import { Button, Text } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import { useEffect } from "react";
import { Item } from "../../types/ItemTypes";

function AddCartButton({ item }: { item: Item }) {
  // get the current user's cart
  const [cart, setCart] = useCartContext();
  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  // useEffect will update cart in local storage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    const payload = Auth.getPayload();
    userId = payload?.userId;
  }

  // create a set of cartIds to lookup when mapping over items below, more performant than looping again
  const cartIds = new Set();
  cart.forEach((cartItem: Item) => cartIds.add(cartItem.id));

  const handleAddCartClick = async (itemId: number) => {
    setLoading(true);

    if (!Auth.isLoggedIn()) {
      // if not logged in, update local cart state, useEffect sets in localStorage
      setCart([...cart, item]);
    } else {
      // otherwise, make api call to update user's cart in db
      const updatedItems = await addCartItem(itemId);
      setCart(updatedItems);
    }

    setLoading(false);
  };

  // using imported util function for deleting item
  const handleCartDelete = async (itemId: number) => {
    if (!Auth.isLoggedIn()) {
      const updatedCart = cart.filter((item: Item) => item.id !== itemId);

      setCart(updatedCart);
      return;
    }

    const updatedItems = await deleteCartItem(itemId);
    setCart(updatedItems);
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
        onClick={() => handleCartDelete(item.id)}
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
      <Button
        onClick={() => handleAddCartClick(item.id)}
        colorScheme="blue"
        width="full">
        {loading ? "adding to your cart..." : "Add to cart"}
      </Button>
    );
    return button;
  }

  // return button;
}

export default AddCartButton;
