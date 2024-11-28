const Joi = require("joi");

exports.CategoryValidator = function (data) {
  try {
    const schema = Joi.object({
      categoryName: Joi.string().required(),
    });
    return schema.validate(data);
  } catch (error) {
    res.json(details[0].message);
  }
};
