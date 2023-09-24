import {
  CloseButton,
  Flex,
  Link,
  Select,
  Stat,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { CartProductMeta } from "./CartProductMeta";
import { redirect, useNavigate } from "react-router-dom";

export const CartItem = ({ item, onClickDelete }) => {
  const navigate = useNavigate();

  return (
    <Flex
      onClick={() => navigate(`/single-item/${item.id}`)}
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center">
      <CartProductMeta
        name={item.name}
        description={item.description}
        image={item.imagePath}
      />

      {/* Desktop */}
      <Flex
        width="full"
        justify="space-between"
        display={{
          base: "none",
          md: "flex",
        }}>
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        {/* <PriceTag price={price} currency={currency} /> */}
        <CloseButton
          colorScheme="whiteAlpha"
          aria-label={`Delete ${item.name} from cart`}
          onClick={onClickDelete}
        />
      </Flex>

      {/* Mobile */}
      <Flex
        mt="4"
        align="center"
        width="full"
        justify="space-between"
        display={{
          base: "flex",
          md: "none",
        }}>
        <CloseButton
          fontSize="sm"
          textDecor="underline"
          onClick={onClickDelete}>
          Delete
        </CloseButton>
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <Stat>
          <StatNumber>${item.price}</StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
};
