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
// import { Rating } from "./Rating";
// import { FavouriteButton } from "./FavouriteButton";
import { PriceTag } from "./PriceTag";
import Auth from "../../util/auth";

export const ProductCard = ({ item }) => {
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
    <Stack
      spacing={{
        base: "4",
        md: "5",
      }}>
      <Box position="relative">
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
        ) : (
          <Button
            onClick={() => handleAddCartClick(item.id)}
            colorScheme="blue"
            width="full">
            Add to cart
          </Button>
        )}
      </Stack>
    </Stack>
  );
};
