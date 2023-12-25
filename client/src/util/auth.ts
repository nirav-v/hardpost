import jwt_decode from "jwt-decode";

type JwtPayload = {
  exp: number;
  iat: number;
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

  getPayload: function () {
    const token = this.getToken();
    if (!token) return null;
    return jwt_decode(token);
  },

  returningUser: () => {
    if (localStorage.getItem("returningUser")) return true;
    else return false;
  },
};

export default Auth;
