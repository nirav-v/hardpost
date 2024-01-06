import jwt_decode from "jwt-decode";
import { Item } from "../types/ItemTypes";

type JwtPayload = {
  exp: number;
  iat: number;
  userId: number;
  username: string;
  email: string;
};

const Auth = {
  isLoggedIn: function () {
    const token = this.getToken();
    if (!token) return false;
    const { exp } = jwt_decode<JwtPayload>(token);
    // true if token exists and is not expired yet
    return token && exp > Date.now() / 1000;
  },

  login: (token: string) => {
    localStorage.setItem("token", token);
  },
  getToken: () => {
    return localStorage.getItem("token");
  },

  getPayload: function (): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;
    return jwt_decode(token);
  },

  // check for items in the local storage cart to send to the backend
  getCart: () => {
    let cart: Item[];
    const localCart = localStorage.getItem("cart");
    cart = localCart ? JSON.parse(localCart) : [];
    return cart;
  },

  returningUser: () => {
    if (localStorage.getItem("returningUser")) return true;
    else return false;
  },
};

export default Auth;
