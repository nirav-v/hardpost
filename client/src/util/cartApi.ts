import Auth from "./auth";

const addCartItem = async (itemId: number) => {
  const res = await fetch("/api/cart", {
    method: "POST",
    body: JSON.stringify({ itemId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  });
  return res.json();
};

const deleteCartItem = async (itemId: number) => {
  const res = await fetch("/api/cart/delete-item", {
    method: "POST",
    body: JSON.stringify({ itemId }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Auth.getToken()}`,
    },
  });
  return res.json();
};

export { addCartItem, deleteCartItem };
