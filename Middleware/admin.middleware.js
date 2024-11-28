const jwt = require("jsonwebtoken");
const BaseError = require("../Utils/BeseError");
require("dotenv").config();

const checkAdmin = async (req, res, next) => {
  const { AccessToken } = req.cookies;

  if (!AccessToken) {
    throw BaseError.BadRequest("Invalid token");
  }
  try {
    const decoded = jwt.verify(AccessToken, process.env.ACCESS_SECRET_KEY);
    req.email = decoded;

    if (req.email.role !== "admin") {
      throw BaseError.BadRequest("You are not admin");
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return next();
};

const checkUser = async (req, res, next) => {
  const { AccessToken } = req.cookies;

  if (!AccessToken) {
    throw BaseError.BadRequest("Invalid token");
  }
  try {
    const decoded = jwt.verify(AccessToken, process.env.ACCESS_SECRET_KEY);
    req.email = decoded;

    if (!req.email.role) {
      throw BaseError.BadRequest("You are not registred");
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return next();
};

module.exports = { checkAdmin, checkUser };
