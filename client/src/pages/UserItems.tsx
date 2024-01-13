import Auth from '../util/auth';
import { useState, useEffect } from 'react';
import { Image, Button, Box, Center, Heading } from '@chakra-ui/react';
import { ProductGrid } from './ShopPage/ProductGrid';
import { useItemsContext } from '../context/ItemsContext';
import { Item } from '../types/ItemTypes';

function UserItems() {
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [items, setItems] = useItemsContext();

  // function to fetch all userItems and update state
  const fetchItems = () => {
    fetch('/api/get-items', {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then(res => res.json())
      .then((userItems: Item[]) => {
        // sort items in place by available items first
        userItems.sort((item2, item1) => {
          if (!item2.sold && item1.sold) return -1;
          else return 0;
        });
        // update both userItems for this component, as well as global items context being used by other sibling components
        setUserItems(userItems);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRemoveItemClick = async (itemId: number) => {
    // grab the item id and send a fetch request to the delete-item route
    console.log('id removed: ', itemId);
    const response = await fetch('/api/delete-item', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    const deletedItem = await response.json();

    const updatedItems = items.filter(item => item.id !== deletedItem.id);

    setItems(updatedItems);

    fetchItems();
  };

  return (
    <div>
      {userItems.length ? (
        <ProductGrid>
          {userItems.map(item => (
            <div key={item.id}>
              <Box boxSize="sm">
                <Image src={item.imagePath} boxSize="300px" objectFit="cover" />
                <Button
                  onClick={() => handleRemoveItemClick(item.id)}
                  colorScheme="red"
                  size="xs">
                  Delete Item
                </Button>
              </Box>
            </div>
          ))}
        </ProductGrid>
      ) : (
        <Center height="100px">
          <Heading>You haven't posted any items yet</Heading>
        </Center>
      )}
    </div>
  );
}

export default UserItems;
