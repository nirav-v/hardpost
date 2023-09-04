import ItemPage from "./ItemPage";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useItemsContext } from "../../util/ItemsContext";

function ShopPage() {
  console.log(useItemsContext());
  const [items, setItems] = useItemsContext();

  useEffect(() => {
    // Make the fetch request here
    fetch("/shop")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  const handleItemClick = (itemId) => {
    console.log("click");
  };

  return (
    <div>
      <h1>ShopPage</h1>
      <p>Items:</p>
      {items.length ? (
        <div>
          {items.map((item) => (
            <div key={item.id} onClick={() => handleItemClick(item.id)}>
              <Link to={`/single-item/${item.id}`}>see details</Link>
              <ItemPage item={item} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ShopPage;
