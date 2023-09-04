import React from "react";

function ItemPage({ item }) {
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

  return (
    <div>
      <p>ItemPage</p>

      <div>
        <p>name: {item.name}</p>
        <p>${item.price}</p>
        <img
          src={item.imagePath}
          alt={`${item.name} image`}
          width="275"
          height="275"
        />

        <button onClick={() => handleAddCartClick(item.id)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemPage;
