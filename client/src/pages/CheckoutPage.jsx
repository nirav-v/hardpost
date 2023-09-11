import React, { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import ShippingForm from "../components/forms/ShippingForm";
import PaymentForm from "../components/forms/PaymentForm";

function CheckoutPage() {
  const [items, setItems] = useCartContext();

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
