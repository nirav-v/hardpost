import { SimpleGrid } from "@chakra-ui/react";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useItemsContext } from "../../util/ItemsContext";

function ShopPage() {
  const [items, setItems] = useItemsContext();

  useEffect(() => {
    // Make the fetch request here
    fetch("/shop")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        setItems(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>ShopPage</h1>
      <p>Items:</p>
      {items.length ? (
        <div>
          <SimpleGrid columns={[2, null, 3]} spacing={10}>
            {items.map((item) => (
              <div key={item.id}>
                <ItemCard item={item} />
                <Link to={`/single-item/${item.id}`}>see details</Link>
              </div>
            ))}
          </SimpleGrid>
        </div>
      ) : null}
    </div>
  );
}

export default ShopPage;
