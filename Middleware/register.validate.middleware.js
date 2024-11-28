const { registerValidator } = require("../Validator/register.validator");

module.exports.RegisterValidate = function (req, res, next) {
  try {
    const { error } = registerValidator(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};