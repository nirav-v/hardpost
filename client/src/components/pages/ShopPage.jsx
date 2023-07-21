import ItemPage from "./ItemPage";

import { useState, useEffect } from "react";

function ShopPage() {
  const [items, setItems] = useState([]);

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

  return (
    <div>
      <h1>ShopPage</h1>
      <p>Items:</p>
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          {/* <a href={`/shop/${item.id}`}>see details</a> */}
        </div>
      ))}
    </div>
  );
}

export default ShopPage;
