import React, { useState, useEffect } from "react";
import { Image, Button, Box, Center, Heading } from "@chakra-ui/react";
import ItemCard from "../components/UI/ItemCard";
import { ProductGrid } from "./ShopPage/ProductGrid";
import { ProductCard } from "./ShopPage/ProductCard";
import Auth from "../util/auth";

function UserItems() {
  const [userItems, setUserItems] = useState([]);

  // function to fetch all userItems and update state
  const fetchItems = () => {
    fetch("/api/get-items", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((items) => {
        // sort items in place by available items first
        items.sort((item2, item1) => {
          if (!item2.sold && item1.sold) return -1;
        });
        setUserItems(items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRemoveItemClick = async (itemId) => {
    // grab the item id and send a fetch request to the delete-item route
    console.log("id removed: ", itemId);
    const deleteItem = await fetch("/api/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    fetchItems();
  };

  return (
    <div>
      {userItems.length ? (
        <ProductGrid>
          {userItems.map((item) => (
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
