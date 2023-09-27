import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { redirect, useNavigate } from "react-router-dom";

export const CartProductMeta = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" spacing="5" width="full">
      <Image
        onClick={() => navigate(`/single-item/${item.id}`)}
        rounded="lg"
        width="120px"
        height="120px"
        fit="cover"
        src={item.imagePath}
        alt={item.name}
        draggable="false"
        loading="lazy"
      />
      <Box pt="4">
        <Stack spacing="0.5">
          <Text fontWeight="medium">{item.name}</Text>
          <Text color={mode("gray.600", "gray.400")} fontSize="sm">
            {item.description}
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};
