import Auth from "../../util/auth";
import { addCartItem, deleteCartItem } from "../../util/cartApi";
import React, { useState } from "react";
import ButtonModal from "../modals/ButtonModal";
import { Button, Text } from "@chakra-ui/react";
import { useCartContext } from "../../context/CartContext";

function AddCartButton({ item }) {
  // get the current user's cart
  const [cart, setCart] = useCartContext();

  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    userId = Auth.getPayload().userId;
    console.log("userId: ", userId);
  }

  // create a set of cartIds to lookup when mapping over items below, more performant than looping again
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  const handleAddCartClick = async (itemId) => {
    if (!Auth.isLoggedIn()) return;
    setLoading(true);
    const updatedItems = await addCartItem(itemId);
    setCart(updatedItems);
    setLoading(false);
  };

  // using imported util function for deleting item
  const handleCartDelete = async (itemId) => {
    const updatedItems = await deleteCartItem(itemId);
    setCart(updatedItems);
  };

  // rendering a different button under different conditions
  let button;

  if (item.sold) {
    button = <Text>Sold</Text>; // item is sold, render "sold" button
  } else if (!Auth.isLoggedIn()) {
    // user not logged in, render the modal opening button to tell them to log in
    button = (
      <ButtonModal buttonContent="Add to Cart">
        {" "}
        <Text fontSize="lg" align="center">
          You must have an account and be logged in to purchase this item
        </Text>
      </ButtonModal>
    );
  } else if (item.userId === userId) {
    button = <Text>My item</Text>; // item belongs to logged in user, render "my item" button
  } else if (cartIds.has(item.id)) {
    button = (
      <Button
        onClick={() => handleCartDelete(item.id)}
        colorScheme="red"
        width="full">
        Remove from cart
      </Button>
    ); // item is in cart, return "remove from cart button"
  } else if (!cartIds.has(item.id)) {
    // item is not in cart, return "add to cart button"
    button = (
      <Button
        onClick={() => handleAddCartClick(item.id)}
        colorScheme="blue"
        width="full">
        {loading ? "adding to your cart..." : "Add to cart"}
      </Button>
    );
  }

  return button;
}

export default AddCartButton;
