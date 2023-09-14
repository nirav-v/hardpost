import { getToken } from "@chakra-ui/react";

const Auth = {
  login: (token) => {
    localStorage.setItem("token", token);
  },
  getToken: () => {
    return localStorage.getItem("token");
  },
};

export default Auth;
