import Auth from "../util/auth";

export const cartApi = {
  addCartItem: async (itemId: number) => {
    const res = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    return res.json();
  },

  deleteCartItem: async (itemId: number) => {
    const res = await fetch("/api/cart/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    return res.json();
  },
};
