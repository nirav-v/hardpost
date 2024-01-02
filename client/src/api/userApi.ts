import { endpoints } from "./endpoints";

type LoginBody = { email: string; password: string };

export const userApi = {
  signup: async () => {},

  login: async (body: LoginBody) => {
    const { url, options } = endpoints.login;
    try {
      const response = await fetch(url, options(body));
      if (response.status === 200) return response.json();
      else return null;
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {},
};
