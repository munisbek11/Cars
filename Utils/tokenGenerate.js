const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccessToken = (peylod) => {
  return jwt.sign(peylod, process.env.ACCESS_SECRET_KEY, {expiresIn: process.env.ACCESS_JWT_TIME})
};

const generateRefreshToken = (peylod) => {
  return jwt.sign(peylod, process.env.REFRESH_SECRET_KEY, {expiresIn: process.env.REFRESH_JWT_TIME})
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
