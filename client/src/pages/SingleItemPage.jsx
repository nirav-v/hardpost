import Auth from "../util/auth";
import { addCartItem } from "../util/cartApi";
import React from "react";
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
  // create a set of cartIds to lookup when mapping over items below
  const cartIds = new Set();
  cart.forEach((cartItem) => cartIds.add(cartItem.id));

  const params = useParams();

  if (items.length < 1)
    return <h1> somethings went wrong with loading this item</h1>;

  const item = items.filter((item) => item.id === parseInt(params.itemId))[0];

  const handleAddCartClick = async (itemId) => {
    if (!Auth.isLoggedIn) return;
    const updatedItems = await addCartItem(itemId);
    setCart(updatedItems);
  };

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
          <ButtonGroup spacing="2">
            {/* <Button variant="solid" colorScheme="blue">
            Buy now
          </Button> */}
            {cartIds.has(item.id) ? (
              "In your cart already"
            ) : (
              <Button
                onClick={() => handleAddCartClick(item.id)}
                variant="ghost"
                colorScheme="blue">
                Add to cart
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SingleItemPage;
