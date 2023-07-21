import React, { useState, useEffect } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  const handleCartDelete = (itemId) => {
    fetch("/api/cart/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  };

  return (
    <div>
      <h2>your cart: </h2>
      {cart.length ? (
        <div>
          <ul>
            {cart.map((item) => {
              return (
                <li key={item.id}>
                  {item.name} ${item.price}
                  <button onClick={() => handleCartDelete(item.id)}>
                    delete from cart
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        "no items in cart"
      )}
    </div>
  );
}

export default CartPage;
