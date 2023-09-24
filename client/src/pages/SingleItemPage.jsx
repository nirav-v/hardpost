import React from "react";
import { useItemsContext } from "../context/ItemsContext";
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
import Auth from "../util/auth";

const SingleItemPage = () => {
  const [items, setItems] = useItemsContext();
  const params = useParams();

  if (items.length < 1)
    return <h1> somethings went wrong with loading this item</h1>;

  const item = items.filter((item) => item.id === parseInt(params.itemId))[0];

  const handleAddCartClick = (itemId) => {
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
            <Button
              onClick={() => handleAddCartClick(item.id)}
              variant="ghost"
              colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SingleItemPage;
