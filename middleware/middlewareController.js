const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          return res.status(403).json("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You're not authorized to access");
    }
  },
  verifyTokenOwnerAndAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.role === "admin") {
        next();
      } else {
        res.status(403).json("You're not allowed to this");
      }
    });
  },
  verifyTokenAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.role === "admin") {
        next();
      } else {
        res.status(403).json("You're not allowed to this");
      }
    });
  },
};

module.exports = middlewareController;
