import React, { useState, useEffect } from "react";
import ShippingForm from "../forms/ShippingForm";
import PaymentForm from "../forms/PaymentForm";

function CheckoutPage() {
  const [items, setItems] = useState([]);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expirationDate: "",
    cvv: "",
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
        // updated empty items array returned by order request so update the items state to no items
        setItems(updatedItems);
        // You can implement your own logic here, such as sending the shippingInfo to the server
        console.log("Shipping Info:", shippingInfo);
        // access shipping info and clear shipping form
        setShippingInfo({
          name: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
        });
        // access payment info and clear form by resetting state
        console.log("Payment Info: ", paymentInfo);
        setPaymentInfo({
          cardNumber: "",
          cardName: "",
          expirationDate: "",
          cvv: "",
        });
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
      <PaymentForm paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo} />
      <button onClick={handleOrderClick}>Place Order</button>
    </div>
  );
}

export default CheckoutPage;
