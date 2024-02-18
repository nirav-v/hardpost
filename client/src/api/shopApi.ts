import { endpoints } from './endpoints';

export const shopApi = {
  getAllItems: async () => {
    try {
      const response = await fetch('/api/shop');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  addItem: async (body: FormData) => {
    const { url, options } = endpoints.addItem;
    try {
      const response = await fetch(url, options(body));
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};
