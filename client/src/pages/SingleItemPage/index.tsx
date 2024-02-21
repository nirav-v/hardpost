import AddCartButton from '../../components/buttons/AddCartButton';
import { useParams } from 'react-router-dom';
import {
  Center,
  Card,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Text,
  Heading,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';
import { Item } from '../../types/ItemTypes';
import { useItemsQuery } from '../../hooks/queries/useItemsQuery';

const SingleItemPage = function () {
  // const [items, setItems] = useItemsContext();
  const { isPending, isError, data: items, error } = useItemsQuery();

  const params = useParams();

  let item: Item | undefined;

  if (params.itemId && items) {
    const itemId = parseInt(params.itemId);
    item = items.find(item => item.id === itemId);
  }

  if (isError || !item)
    return (
      <Text textAlign="center">
        {' '}
        something went wrong with loading this item
      </Text>
    );

  return (
    <Center>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={item.imagePath}
            alt={`${item.name} image`}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Text>@{item.user.username}</Text>
            <Heading size="md">{item.name}</Heading>
            <Text>{item.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${item.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <AddCartButton item={item} />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Center>
  );
};

export default SingleItemPage;
