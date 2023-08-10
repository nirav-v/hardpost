import React, { useState } from "react";

function PaymentForm({ paymentInfo, setPaymentInfo }) {
  const handlePaymentInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Payment Information</h3>
      <form>
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentInputChange}
            required
          />
        </label>
        <label>
          Cardholder Name:
          <input
            type="text"
            name="cardName"
            value={paymentInfo.cardName}
            onChange={handlePaymentInputChange}
            required
          />
        </label>
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={paymentInfo.expirationDate}
            onChange={handlePaymentInputChange}
            required
          />
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentInputChange}
            required
          />
        </label>
      </form>
    </div>
  );
}

export default PaymentForm;
