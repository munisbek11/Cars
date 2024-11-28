const Joi = require("joi");

exports.registerValidator = function (data) {
  try {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      phone: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      verify_code: Joi.string().min(6).max(6),
    });
    return schema.validate(data);
  } catch (error) {
    res.json(details[0].message);
  }
};
