import React, { useState, useEffect } from "react";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((orders) => setOrders(orders));
  }, []);

  console.log(orders);

  return (
    <div>
      <h2>your orders</h2>
      {orders.length ? (
        <ul>
          {orders.map((order) => {
            return (
              <li key={order.id}>
                <p>placed: {order.createdAt}</p>
                {order.items.map((item) => (
                  <p key={item.id}>{item.name}</p>
                ))}
              </li>
            );
          })}
        </ul>
      ) : (
        "no orders"
      )}
    </div>
  );
}

export default OrdersPage;
