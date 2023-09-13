const jwt = require("jsonwebtoken");

const Auth = {
  verifyToken: (token, secret) => {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = Auth;
