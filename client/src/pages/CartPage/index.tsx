import Auth from "../../util/auth";

import {
  Flex,
  Link,
  useColorModeValue as mode,
  Stack,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { deleteCartItem } from "../../util/cartApi";
import { Link as ReactRouterLink } from "react-router-dom";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useCartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

function CartPage() {
  const [cart, setCart] = useCartContext();

  // using imported util function for deleting item
  const handleCartDelete = async (itemId: number) => {
    if (!Auth.isLoggedIn()) {
      const updatedCart = cart.filter((item) => item.id !== itemId);
      setCart(updatedCart);
      return;
    }

    const updatedItems = await deleteCartItem(itemId);
    setCart(updatedItems);
  };

  const handleCheckoutSubmit = async () => {
    if (!Auth.isLoggedIn()) {
      alert("Please log in to checkout");
      return;
    }

    if (!cart.length) return;

    const domain = `${window.location.protocol}//${window.location.host}`;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        domain: domain,
        cart,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": domain,
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const session = await res.json();
    const stripe = await loadStripe(
      "pk_test_51NpbteEHf8A5rB27b2EI52s44oXzHWFqcQqYhpohOETeB3ryMLGAhIp51yo5GbSQwyXU7LEoBAnR3fg1WXGZ8w4m00O9aMv0Bw"
    );

    if (stripe) stripe.redirectToCheckout({ sessionId: session.id });
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
                      item={item}></CartItem>
                  );
                })}
              </Stack>
            </Stack>

            <Flex direction="column" align="center" flex="1">
              <CartOrderSummary
                cartData={cart}
                onCheckoutSubmit={handleCheckoutSubmit}
              />
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
