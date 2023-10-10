import Auth from "./auth";

const deleteCartItem = async (itemId) => {
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

export default deleteCartItem;
