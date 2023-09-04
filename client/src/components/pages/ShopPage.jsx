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
          {items.map((item) => (
            <div key={item.id}>
              <ItemCard item={item} />
              <Link to={`/single-item/${item.id}`}>see details</Link>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ShopPage;
