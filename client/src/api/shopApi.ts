import { endpoints } from './endpoints';

export const shopApi = {
  getAllItems: async () => {
    try {
      const response = await fetch('/api/shop');
      return response.json();
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

  getItemBySearch: async (searchTerm: string | null) => {
    try {
      const response = await fetch(`/api/shop/search/${searchTerm}`);
      return response.json();
    } catch (error) {
      console.log(error);
    }
  },
};
