import Auth from "../util/auth";
import ButtonModal from "../components/UI/ButtonModal";
import { addCartItem } from "../util/cartApi";
import React from "react";
import { useState } from "react";
import { useItemsContext } from "../context/ItemsContext";
import { useCartContext } from "../context/CartContext";
import { useParams } from "react-router-dom";
import {
  Center,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

const SingleItemPage = () => {
  const [items, setItems] = useItemsContext();
  console.log(items);
  const [cart, setCart] = useCartContext();

  // DUPLICATE CODE from ProductCard
  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    userId = Auth.getPayload().userId;
    console.log("userId: ", userId);
  }
  // create a set of cartIds to lookup when mapping over items below
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  const params = useParams();

  if (items.length < 1)
    return <h1> somethings went wrong with loading this item</h1>;

  const item = items.filter((item) => item.id === parseInt(params.itemId))[0];

  const handleAddCartClick = async (itemId) => {
    if (!Auth.isLoggedIn()) return;
    const updatedItems = await addCartItem(itemId);
    setCart(updatedItems);
  };

  // DUPLICATE CODE from ProductCard for conditional rendering of button, extract somewhere else for reusability
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

  return (
    <Center>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={item.imagePath}
            alt={`${item.name} image`}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{item.name}</Heading>
            <Text>{item.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${item.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">{button}</ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SingleItemPage;
