import Auth from "../../util/auth";
import { addCartItem, deleteCartItem } from "../../util/cartApi";
import React, { useState } from "react";
import ButtonModal from "../modals/ButtonModal";
import { Button, Text } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";
import { useEffect } from "react";

function AddCartButton({ item }) {
  // get the current user's cart
  const [cart, setCart] = useCartContext();

  // update cart in local storage when state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    userId = Auth.getPayload().userId;
  }

  // create a set of cartIds to lookup when mapping over items below, more performant than looping again
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  const handleAddCartClick = async (itemId) => {
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
  const handleCartDelete = async (itemId) => {
    if (!Auth.isLoggedIn()) {
      const updatedCart = cart.filter((item) => item.id !== itemId);
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

  // if (!Auth.isLoggedIn()) {
  //   // user not logged in, render the modal opening button to tell them to log in
  //   button = (
  //     <ButtonModal buttonContent="Add to Cart">
  //       {" "}
  //       <Text fontSize="lg" align="center">
  //         You must have an account and be logged in to purchase this item
  //       </Text>
  //     </ButtonModal>
  //   );
  //   return button;
  // }

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
