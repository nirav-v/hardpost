import React, { useState, useEffect } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

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
