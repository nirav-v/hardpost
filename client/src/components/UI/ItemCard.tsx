import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import Auth from "../../util/auth";
import { Item } from "../../types/ItemTypes";

function ItemPage({ item }: { item: Item }) {
  const handleAddCartClick = (itemId: number) => {
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
    <Card size="sm">
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
        {item.sold ? (
          "This item has been sold"
        ) : (
          <Button
            onClick={() => handleAddCartClick(item.id)}
            variant="ghost"
            colorScheme="blue">
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ItemPage;
