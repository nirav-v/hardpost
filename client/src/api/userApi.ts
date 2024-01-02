import { endpoints } from "./endpoints";

type LoginBody = { email: string; password: string };

export const userApi = {
  signup: async () => {},

  login: async (body: LoginBody) => {
    try {
      const response = await fetch(endpoints.login, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json", // tells server that data is in json format
        },
      });
      if (response.status === 200) return response.json();
      else return null;
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {},
};
