import CheckoutModal from "../../components/UI/CheckoutModal";
import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

function formatPrice(value, opts = {}) {
  const { locale = "en-US", currency = "USD" } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = ({ cartData, onCheckoutSubmit }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const getTotalPrice = (cartArr) => {
    if (cartArr.length) {
      let sum = cartArr.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0
      );
      setTotalPrice(sum);
    }

    console.log("total", totalPrice);
  };

  useEffect(() => getTotalPrice(cartData), [cartData]);

  console.log(cartData);
  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>

      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalPrice)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalPrice)}
          </Text>
        </Flex>
      </Stack>
      <CheckoutModal />
      <Button
        onClick={onCheckoutSubmit}
        colorScheme="blue"
        size="lg"
        fontSize="md">
        Checkout
      </Button>
    </Stack>
  );
};
