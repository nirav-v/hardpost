import React, { useState, useEffect } from "react";
import Auth from "../util/auth";
import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import formatTimestamp from "../util/formatTimestamp";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((orders) => setOrders(orders));
  }, []);

  console.log(orders);

  // function to calculate the total price from an order object
  const orderPrice = (order) =>
    order.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );

  return (
    <div>
      {orders.length ? (
        <List spacing={5}>
          <Center height="100px">
            <Heading>Your Orders</Heading>
          </Center>
          {orders.map((order) => {
            return (
              <ListItem key={order.id}>
                <Card>
                  <CardHeader>
                    <Heading size="md">
                      {formatTimestamp(order.createdAt)}
                    </Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs">
                          {order.items.length} Item
                          {order.items.length > 1 ? "s" : ""} Ordered
                        </Heading>
                        {order.items.map((item) => (
                          <Text key={item.id} pt="2" fontSize="sm">
                            {item.name}
                          </Text>
                        ))}
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Total Price
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          ${orderPrice(order)}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <Center height="100px">
          <Heading>Looks like you haven't placed any orders</Heading>
        </Center>
      )}
    </div>
  );
}

export default OrdersPage;
