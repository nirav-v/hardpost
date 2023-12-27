import AddCartButton from "../../components/buttons/AddCartButton";
import {
  AspectRatio,
  Box,
  HStack,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PriceTag } from "./PriceTag";
import { Link as ReactRouterLink } from "react-router-dom";
import { Item } from "../../types/ItemTypes";

type ProductCardProps = {
  item: Item;
};

export const ProductCard = ({ item }: ProductCardProps) => {
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
              opacity={item.sold ? 0.2 : undefined}
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
            posted by @{item.user.username}
          </Text>
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
      <Stack align="center">
        <AddCartButton item={item} />
      </Stack>
    </Stack>
  );
};
