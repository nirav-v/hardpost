import Auth from "../util/auth";

export const ordersApi = {
  getAllOrders: async () => {
    try {
      const response = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};
