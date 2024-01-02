type LoginBody = { email: string; password: string };

export const endpoints = {
  login: {
    url: "api/user/login",
    options: (body: LoginBody) => {
      return {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json", // tells server that data is in json format
        },
      };
    },
  },

  signup: "api/user/signup",
};
