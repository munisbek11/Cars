const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  const { AccessToken } = req.cookies;

  if (!AccessToken) {
    return res.status(401).json({
      message: "AccessToken not found, please login again!",
    });
  }

  jwt.sign(AccessToken, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token or token expired, please login again!",
      });
    }
    req.user = decoded;
  });

  next();
};

module.exports = verifyAccessToken;
