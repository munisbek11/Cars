const RegisterSchemas = require("../Schema/register.schema");
const bcryptjs = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Utils/tokenGenerate");
const BaseError = require("../Utils/BeseError");

const register = async (req, res, next) => {
  try {
    const { first_name, last_name, phone, email, password, role, verify_code } =
      req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (foundUser) {
      throw BaseError.BadRequest("User has already registered");
    }

    const randomNumber = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    )
      .join("")
      .trim();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_GOOGLE_PASS_KEY,
      },
    });

    const sendEmail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification code ov devbook",
      html: `<p style= "color: blue; font-size: 40px">Tasdiqlash kodi: <b style= "color: green; font-size: 35px">${randomNumber}</b></p>`,
    };

    await transporter.sendMail(sendEmail, (error, info) => {
      if (error) {
       return error.message
      } else {
        res.json({
          message: info.response,
        });
      }
    });
    const hashedPassword = await bcryptjs.hash(password, 12);

    const userRegister = await RegisterSchemas.create({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
      role,
      verify_code: randomNumber,
    });
    res.json({
      message: "Added new user",
    });
    setTimeout(async () => {
      await RegisterSchemas.findByIdAndUpdate(userRegister._id, {verify_code: "",});
    }, 60 * 1000);
  } catch (err) {
    next(err);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, verify_code_by_client } = req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (!foundUser) {
      throw BaseError.BadRequest("User not found!");
    }

    if (
      foundUser.verify_code === verify_code_by_client &&
      verify_code_by_client !== ""
    ) {
      await RegisterSchemas.findByIdAndUpdate(foundUser._id, {
        verify: true,
        verify_code: "",
      });
      return res.json({
        message: "Verify succesfuly",
      });
    } else {
      throw BaseError.BadRequest("Verify code mistake or not exists");
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await RegisterSchemas.findOne({ email: email });

    if (!foundUser) {
      throw BaseError.BadRequest("User not found!");
    }

    const decrypt = await bcryptjs.compare(password, foundUser.password);

    if (!decrypt) {
      throw BaseError.BadRequest("Wrong password");
    }

    if (foundUser.verify === true) {
      const AccessToken = generateAccessToken({
        id: foundUser._id,
        role: foundUser.role,
        email: foundUser.email,
      });

      const RefreshToken = generateRefreshToken({
        id: foundUser._id,
        role: foundUser.role,
        email: foundUser.email,
      });

      res.cookie("AccessToken", AccessToken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_ACCESS_TIME,
      });
      res.cookie("RefreshToken", RefreshToken, {
        httpOnly: true,
        maxAge: process.env.COOKIE_REFRESH_TIME,
      });

      res.json({
        message: "Successfuly",
        tokens: {
          AccessToken: AccessToken,
        },
      });
    } else {
      throw BaseError.BadRequest("You were not verified");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const logout = (req, res) => {
  res.clearCookie("AccessToken", { httpOnly: true, secure: true });
  res.clearCookie("RefreshToken", { httpOnly: true, secure: true });

  res.json({
    message: "Successfully logged out",
  });
};

module.exports = {
  register,
  login,
  verify,
  logout,
};
