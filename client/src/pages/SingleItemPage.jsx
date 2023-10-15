import Auth from "../util/auth";
import AddCartButton from "../components/UI/AddCartButton";
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

  const params = useParams();

  if (items.length < 1)
    return <h1> somethings went wrong with loading this item</h1>;

  const item = items.filter((item) => item.id === parseInt(params.itemId))[0];

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
            <Text>@{item.user.username}</Text>
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
            <AddCartButton item={item} />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SingleItemPage;
