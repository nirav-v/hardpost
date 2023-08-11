const withAuth = (req, res, next) => {
  console.log("IN WITH AUTH", req.session);
  if (!req.session.userId) {
    res.redirect("/shop");
  } else {
    next();
  }
};

module.exports = withAuth;
