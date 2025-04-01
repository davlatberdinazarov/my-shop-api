const Joi = require("joi");

const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const videoSchema = Joi.object({
  title: Joi.string().min(3).max(50).required(),
  description: Joi.string().optional().min(3).max(250),
  category: Joi.string().valid("sport", "comedy", "music", "other").required(), // ✅ Faqat shu qiymatlar
  url: Joi.string().required(),
});

module.exports = {
  registerUserSchema,
  loginUserSchema,
  videoSchema,
};
