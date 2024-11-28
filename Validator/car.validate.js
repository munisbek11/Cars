const Joi = require("joi");

exports.CarValidator = function (data) {
  try {
    const schema = Joi.object({
      brandID: Joi.required(),
      carName: Joi.string().required(),
      motor: Joi.number().required(),
      color: Joi.string().required(),
      gearbook: Joi.string().required(),
      darkening: Joi.string().min(3).max(4).required(),
      year: Joi.number().min(4).max(4).required(),
      distansce: Joi.number().required(),
      price: Joi.number().required(),
      description: Joi.string().min(4).max(70).required(),
    });
    return schema.validate(data);
  } catch (error) {
    res.json(details[0].message);
  }
};
