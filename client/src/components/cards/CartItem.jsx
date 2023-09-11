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
// const QuantitySelect = (props) => {
//   return (
//     <Select
//       maxW="64px"
//       aria-label="Select quantity"
//       focusBorderColor={useColorModeValue("blue.500", "blue.200")}
//       {...props}>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//       <option value="4">4</option>
//     </Select>
//   );
// };

export const CartItem = (props) => {
  const {
    name,
    description,
    // quantity,
    imageUrl,
    // currency,
    price,
    // onChangeQuantity,
    onClickDelete,
  } = props;
  return (
    <Flex
      direction={{
        base: "column",
        md: "row",
      }}
      justify="space-between"
      align="center">
      <CartProductMeta name={name} description={description} image={imageUrl} />

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
          aria-label={`Delete ${name} from cart`}
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
        <Link fontSize="sm" textDecor="underline" onClick={onClickDelete}>
          Delete
        </Link>
        {/* <QuantitySelect
          value={quantity}
          onChange={(e) => {
            onChangeQuantity?.(+e.currentTarget.value);
          }}
        /> */}
        <Stat>
          <StatNumber>${price}</StatNumber>
        </Stat>
      </Flex>
    </Flex>
  );
};
