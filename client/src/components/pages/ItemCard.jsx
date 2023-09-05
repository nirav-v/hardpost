import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

function ItemPage({ item }) {
  const handleAddCartClick = (itemId) => {
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <Card size="sm">
      <CardBody>
        <Image
          src={item.imagePath}
          alt="Green double couch with wooden legs"
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
        <Button
          onClick={() => handleAddCartClick(item.id)}
          variant="ghost"
          colorScheme="blue">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ItemPage;
