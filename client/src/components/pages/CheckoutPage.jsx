import React, { useState, useEffect } from "react";

function CheckoutPage() {
  const [items, setItems] = useState([]);
  // making another fetch for cart items as CartPage is not rendering CheckoutPage so cannot pass down state
  // not most efficient solution, duplicating code from CartPage can resolve later
  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  console.log(items);

  const handleOrderClick = () => {
    console.log("click");
    fetch("/api/create-order", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((updatedItems) => {
        console.log(updatedItems);
        setItems(updatedItems);
      });
  };

  return (
    <div>
      <p>confirm order details</p>
      <p>Shipping information (form)</p>
      <p>Payment information (form)</p>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id}>
              {item.name} ${item.price}
            </li>
          );
        })}
      </ul>
      <button onClick={handleOrderClick}>Place Order</button>
    </div>
  );
}

export default CheckoutPage;
