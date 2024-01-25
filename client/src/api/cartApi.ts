import Auth from '../util/auth';

export const cartApi = {
  getCartItems: async () => {
    try {
      const res = await fetch('/api/cart', {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      const cart = await res.json();
      return cart;
    } catch (error) {
      console.log(error);
    }
  },

  addCartItem: async (itemId: number) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    return res.json();
  },

  deleteCartItem: async (itemId: number) => {
    const res = await fetch('/api/cart/delete-item', {
      method: 'POST',
      body: JSON.stringify({ itemId }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    return res.json();
  },
};
