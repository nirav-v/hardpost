import {
  List,
  ListItem,
  Card,
  CardHeader,
  CardBody,
  Center,
  Heading,
  Text,
  Box,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import formatTimestamp from '../../util/formatTimestamp';
import { Order } from '../../types/OrderType';
import { useOrdersQuery } from '../../hooks/queries';

function OrdersPage() {
  const { data: orders, isPending, isError } = useOrdersQuery();
  // console.log(orders);

  // function to calculate the total price from an order object
  const orderPrice = (order: Order) =>
    order.items.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      0
    );

  if (isPending) return <div>Fetching your orders...</div>;

  return (
    <div>
      {orders?.length ? (
        <List spacing={5}>
          <Center height='100px'>
            <Heading>Your Orders</Heading>
          </Center>
          {orders.map(order => {
            return (
              <ListItem key={order.id}>
                <Card>
                  <CardHeader>
                    <Heading size='md'>
                      {formatTimestamp(order.createdAt)}
                    </Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs'>
                          {order.items.length} Item
                          {order.items.length > 1 ? 's' : ''} Ordered
                        </Heading>
                        {order.items.map(item => (
                          <Text key={item.id} pt='2' fontSize='sm'>
                            {item.name}
                          </Text>
                        ))}
                      </Box>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                          Total Price
                        </Heading>
                        <Text pt='2' fontSize='sm'>
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
        <Center height='100px'>
          <Heading>Looks like you haven't placed any orders</Heading>
        </Center>
      )}
    </div>
  );
}

export default OrdersPage;
