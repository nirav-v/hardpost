import React, { useState } from "react";

function ShippingForm({ shippingInfo, setShippingInfo }) {
  const handleShippingInputChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <form className="shipping-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingInputChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInputChange}
            required
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingInputChange}
            required
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleShippingInputChange}
            required
          />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            name="zipcode"
            value={shippingInfo.zipcode}
            onChange={handleShippingInputChange}
            required
          />
        </label>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default ShippingForm;
