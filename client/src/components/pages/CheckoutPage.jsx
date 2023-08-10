import React, { useState, useEffect } from "react";
import ShippingForm from "../forms/ShippingForm";

function CheckoutPage() {
  const [items, setItems] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // making another fetch for cart items as CartPage is not rendering CheckoutPage so cannot pass down state
  // not most efficient solution, duplicating code from CartPage can resolve later
  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleOrderClick = () => {
    console.log("click");
    fetch("/api/create-order", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((updatedItems) => {
        console.log(updatedItems);
        // You can implement your own logic here, such as sending the shippingInfo to the server
        console.log("Shipping Info:", shippingInfo);
        setShippingInfo({
          name: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
        });
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
      <ShippingForm
        shippingInfo={shippingInfo}
        setShippingInfo={setShippingInfo}
      />
      <button onClick={handleOrderClick}>Place Order</button>
    </div>
  );
}

export default CheckoutPage;
