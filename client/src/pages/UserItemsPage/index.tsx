import { Button, Center, Heading, Text } from '@chakra-ui/react';
import { ProductGrid } from '../ShopPage/ProductGrid';
import { useUserItemsQuery } from '../../hooks/queries';
import { ProductCard } from '../ShopPage/ProductCard';
import { useDeleteItemMutation } from '../../hooks/mutations';
import Auth from '../../util/auth';
import ButtonModal from '../../components/modals/ButtonModal';

function UserItems() {
  const { username } = Auth.getPayload();
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
      <Heading fontFamily={'mono'} marginTop={8} textAlign={'center'}>
        Hi there {username}!
      </Heading>
      {userItems.data?.length ? (
        <ProductGrid>
          {userItems.data?.map(item => (
            <div key={item.id}>
              <ProductCard item={item} />
              <ButtonModal
                buttonContent='Delete Item'
                chakraColor='red'
                cypress='delete-item-btn'>
                <Button
                  onClick={() => handleRemoveItemClick(item.id)}
                  colorScheme='red'
                  size='xs'>
                  I am sure I want to delete Item
                </Button>
              </ButtonModal>
            </div>
          ))}
        </ProductGrid>
      ) : (
        <Center height='100px'>
          <Heading fontFamily={'body'}>
            Looks like you haven't posted any items yet
          </Heading>
        </Center>
      )}
    </div>
  );
}

export default UserItems;
