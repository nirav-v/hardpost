import jwt_decode from "jwt-decode";

const Auth = {
  isLoggedIn: function () {
    if (!this.getToken()) return false;
    const token = this.getToken();
    const { exp } = jwt_decode(token);
    // true if token exists and is not expired yet
    return token && exp > Date.now() / 1000;
  },

  login: (token) => {
    localStorage.setItem("token", token);
  },
  getToken: () => {
    return localStorage.getItem("token");
  },

  getPayload: function () {
    console.log("this", this);
    const token = this.getToken();
    return jwt_decode(token);
  },

  returningUser: () => {
    if (localStorage.getItem("returningUser")) return true;
    return false;
  },
};

export default Auth;
