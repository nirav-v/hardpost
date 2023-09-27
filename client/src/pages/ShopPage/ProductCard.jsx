import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { PriceTag } from "./PriceTag";
import { Link as ReactRouterLink } from "react-router-dom";
import Auth from "../../util/auth";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";

export const ProductCard = ({ item }) => {
  // get the current user's cart
  const [cart, setCart] = useCartContext();

  // create a set of cartIds to lookup when mapping over items below
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));
  console.log(cart);
  console.log(cartIds);

  // loading state to track while add to cart request is happening and finished
  const [loading, setLoading] = useState(false);

  const handleAddCartClick = (itemId) => {
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
      <Stack align="center">
        {item.sold ? (
          <Text>Sold</Text>
        ) : cartIds.has(item.id) ? (
          <Button
            onClick={() => handleCartDelete(item.id)}
            colorScheme="red"
            width="full">
            Remove from cart
          </Button>
        ) : (
          <Button
            onClick={() => handleAddCartClick(item.id)}
            colorScheme="blue"
            width="full">
            {loading ? "adding to your cart..." : "Add to cart"}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
