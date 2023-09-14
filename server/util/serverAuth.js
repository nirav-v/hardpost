const jwt = require("jsonwebtoken");

const Auth = {
  verifyToken: (headers, secret) => {
    try {
      if (!headers.authorization)
        return {
          unauthorized: "no token provided in headers, please log in first",
        };

      const token = headers.authorization.split(" ")[1];

      const payload = jwt.verify(token, secret);
      return payload;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = Auth;
