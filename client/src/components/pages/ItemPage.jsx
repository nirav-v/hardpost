import React from "react";
import { useState, useEffect } from "react";

function ItemPage({ itemId }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/shop/${itemId}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  }, []);

  const handleAddCartClick = (itemId) => {
    fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  //   console.log(item);
  return (
    <div>
      <p>ItemPage</p>
      {item ? (
        <div>
          <p>description: {item.description}</p>
          <p>category: {item.category}</p>
          <p>${item.price}</p>
          <button onClick={() => handleAddCartClick(item.id)}>
            Add to Cart
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default ItemPage;
