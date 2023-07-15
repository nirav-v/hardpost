import { useState, useEffect } from "react";

function ShopPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Make the fetch request here
    fetch("http://localhost:3000/shop")
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
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default ShopPage;
