import Auth from "../../util/auth";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import BasicModal from "../../components/UI/BasicModal";
import { PriceTag } from "./PriceTag";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

export const ProductCard = ({ item }) => {
  // get the current user's cart
  const [cart, setCart] = useCartContext();

  // access the current user's id by decoding the jwt in local storage
  let userId;
  if (Auth.isLoggedIn()) {
    userId = Auth.getPayload().userId;
    console.log("userId: ", userId);
  }

  // create a set of cartIds to lookup when mapping over items below
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));
  console.log("cart context", cart);
  console.log("cart ids", cartIds);

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  const handleAddCartClick = (itemId) => {
    if (!Auth.isLoggedIn()) return;

    setLoading(true);
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((updatedItems) => setCart(updatedItems));
  };

  // duplicate code for delete function in cart page, consider importing as util function
  const handleCartDelete = (itemId) => {
    fetch("/api/cart/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((updatedItems) => setCart(updatedItems));
  };

  // rendering a different button under different conditions
  let button;

  if (item.sold) {
    button = <Text>Sold</Text>; // item is sold, render "sold" button
  } else if (!Auth.isLoggedIn()) {
    // user not logged in, render the modal opening button to tell them to log in
    button = (
      <BasicModal>
        {" "}
        <Text fontSize="lg" align="center">
          You must have an account and be logged in to purchase this item
        </Text>
      </BasicModal>
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
    <Stack
      spacing={{
        base: "4",
        md: "5",
      }}>
      <Box position="relative">
        <ReactRouterLink to={`/single-item/${item.id}`}>
          <AspectRatio ratio={4 / 3}>
            <Image
              src={item.imagePath}
              alt={item.name}
              opacity={item.sold ? 0.2 : null}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={{
                base: "md",
                md: "xl",
              }}
            />
          </AspectRatio>
        </ReactRouterLink>
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text
            fontWeight="medium"
            color={useColorModeValue("gray.700", "gray.400")}>
            {item.name}
          </Text>
          <PriceTag price={item.price} currency="USD" />
        </Stack>
        <HStack></HStack>
      </Stack>
      {/* content of button conditionally rendered using logic above */}
      <Stack align="center">{button}</Stack>
    </Stack>
  );
};
