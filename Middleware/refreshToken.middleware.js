const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../Utils/tokenGenerate");

const verifyRefreshToken = (req, res) => {
  const { RefreshToken } = req.cookies;

  if (!RefreshToken) {
    return res.status(401).json({
      message: "AccessToken not found, please login again!",
    });
  }

  const decoded = jwt.verify(RefreshToken, process.env.REFRESH_SECRET_KEY);
  req.user = decoded;

  if (!decoded) {
    return res.status(403).json({
      message: "Invalid Refreshtoken or token expired, please login again!",
    });
  }
  const AccessToken = generateAccessToken({
    id: req.user.id,
    email: req.user.email,
    role: req.user.role,
  });
  res.cookie("AccessToken", AccessToken, {
    httpOnly: true,
    maxAge: process.env.COOKIE_ACCESS_TIME,
  });

  res.json({
    message: "RefreshToken updated",
    AccessToken
  })
};

module.exports = verifyRefreshToken;
