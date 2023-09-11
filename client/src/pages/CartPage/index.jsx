import React, { useState, useEffect, useContext } from "react";
import {
  CloseButton,
  Flex,
  Link,
  Select,
  useColorModeValue as mode,
  Stack,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useCartContext } from "../../context/CartContext";

function CartPage() {
  const [cart, setCart] = useCartContext();

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleCartDelete = (itemId) => {
    fetch("/api/cart/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updatedItems) => setCart(updatedItems));
  };

  return (
    <div>
      <div>
        <Box
          maxW={{
            base: "3xl",
            lg: "7xl",
          }}
          mx="auto"
          px={{
            base: "4",
            md: "8",
            lg: "12",
          }}
          py={{
            base: "6",
            md: "8",
            lg: "12",
          }}>
          <Stack
            direction={{
              base: "column",
              lg: "row",
            }}
            align={{
              lg: "flex-start",
            }}
            spacing={{
              base: "8",
              md: "16",
            }}>
            <Stack
              spacing={{
                base: "8",
                md: "10",
              }}
              flex="2">
              <Heading fontSize="2xl" fontWeight="extrabold">
                Shopping Cart ({cart.length} items)
              </Heading>

              <Stack spacing="6">
                {cart.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      onClickDelete={() => handleCartDelete(item.id)}
                      name={item.name}
                      price={item.price}
                      imageUrl={item.imagePath}></CartItem>
                  );
                })}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary cartData={cart} />
              <HStack mt="6" fontWeight="semibold">
                <p>or</p>
                <Link
                  as={ReactRouterLink}
                  to="/"
                  color={mode("blue.500", "blue.200")}>
                  Continue shopping
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      </div>
    </div>
  );
}

export default CartPage;
