import { Button, Center, Heading } from '@chakra-ui/react';
import { ProductGrid } from '../ShopPage/ProductGrid';
import { useUserItemsQuery } from '../../hooks/queries';
import { ProductCard } from '../ShopPage/ProductCard';
import { useDeleteItemMutation } from '../../hooks/mutations';

function UserItems() {
  // fetching all out user's items from db
  const userItems = useUserItemsQuery();
  // mutation to delete user items from db and refetch afterwards
  const deleteUserItem = useDeleteItemMutation();

  // sort items in place by available items first
  userItems.data?.sort((item2, item1) => {
    if (!item2.sold && item1.sold) return -1;
    else return 0;
  });

  const handleRemoveItemClick = async (itemId: number) => {
    // grab the item id and send a fetch request to the delete-item route
    deleteUserItem.mutate(itemId);
  };

  return (
    <div>
      {userItems.data?.length ? (
        <ProductGrid>
          {userItems.data?.map(item => (
            <div key={item.id}>
              <ProductCard item={item} />
              <Button
                onClick={() => handleRemoveItemClick(item.id)}
                colorScheme='red'
                size='xs'>
                Delete Item
              </Button>
            </div>
          ))}
        </ProductGrid>
      ) : (
        <Center height='100px'>
          <Heading>You haven't posted any items yet</Heading>
        </Center>
      )}
    </div>
  );
}

export default UserItems;
