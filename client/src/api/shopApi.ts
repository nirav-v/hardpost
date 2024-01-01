export const shopApi = {
  getAllItems: async () => {
    try {
      const response = await fetch("/shop");
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
