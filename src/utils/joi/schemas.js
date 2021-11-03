const Joi = require("joi");
const { Sanitized, ObjectId } = require("./rules");

const {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  MAX_ORGANIZATION_LENGTH,
  MIN_ORGANIZATION_LENGTH,
} = require("./constants");

const {
  REQUIRED_FIELD_MESSAGE,
  MIN_MESSAGE,
  MAX_MESSAGE,
  POSITIVE_MESSAGE,
} = require("./messages");

module.exports = {
  loginSchema: Joi.object({
    username: Joi.string()
      .custom(Sanitized)
      .required()
      .messages({ "any.required": REQUIRED_FIELD_MESSAGE }),
    password: Joi.string()
      .custom(Sanitized)
      .required()
      .messages({ "any.required": REQUIRED_FIELD_MESSAGE }),
  }),

  registerSchema: Joi.object({
    username: Joi.string()
      .trim()
      .custom(Sanitized)
      .alphanum()
      .min(MIN_USERNAME_LENGTH)
      .max(MAX_USERNAME_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
    password: Joi.string()
      .custom(Sanitized)
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
    email: Joi.string().trim().custom(Sanitized).email().required().messages({
      "string.min": MIN_MESSAGE,
      "string.max": MAX_MESSAGE,
      "any.required": REQUIRED_FIELD_MESSAGE,
    }),
    organization: Joi.string()
      .custom(Sanitized)
      .min(MIN_ORGANIZATION_LENGTH)
      .max(MAX_ORGANIZATION_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
  }),

  checkoutSchema: Joi.object({
    merchantId: ObjectId().required(),
    amount: Joi.number().positive().message(POSITIVE_MESSAGE).required(),
    APP_ID: Joi.string().trim().required(),
    APP_KEY: Joi.string().trim().required(),
  }).with("APP_ID", "APP_KEY"),

  paymentSchema: Joi.object({
    cvv: Joi.number().integer().required(),
    card_number: Joi.number().integer().required(),
    merchantId: ObjectId(),
    amount: Joi.number().positive().message(POSITIVE_MESSAGE).required(),
    APP_ID: Joi.string().trim().required(),
    APP_KEY: Joi.string().trim().required(),
    iat: Joi.optional(),
  })
    .with("APP_ID", "APP_KEY")
    .with("cvv", "card_number"),
};
