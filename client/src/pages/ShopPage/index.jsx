import { SimpleGrid } from "@chakra-ui/react";
import ItemCard from "../../components/UI/ItemCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useItemsContext } from "../../context/ItemsContext";

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
      {items.length ? (
        <div>
          <SimpleGrid columns={[2, null, 4]} spacing={10}>
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
