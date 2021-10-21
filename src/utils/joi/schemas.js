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
} = require("./messages");
const { customJoi } = require("./validators");

module.exports = {
  loginSchema: customJoi.object({
    username: customJoi
      .string()
      .htmlStripped()
      .required()
      .messages({ "any.required": REQUIRED_FIELD_MESSAGE }),
    password: customJoi
      .string()
      .htmlStripped()
      .required()
      .messages({ "any.required": REQUIRED_FIELD_MESSAGE }),
  }),

  registerSchema: customJoi.object({
    username: customJoi
      .string()
      .trim()
      .htmlStripped()
      .alphanum()
      .min(MIN_USERNAME_LENGTH)
      .max(MAX_USERNAME_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
    password: customJoi
      .string()
      .htmlStripped()
      .min(MIN_PASSWORD_LENGTH)
      .max(MAX_PASSWORD_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
    email: customJoi
      .string()
      .trim()
      .htmlStripped()
      .email()
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
    organization: customJoi
      .string()
      .htmlStripped()
      .min(MIN_ORGANIZATION_LENGTH)
      .max(MAX_ORGANIZATION_LENGTH)
      .required()
      .messages({
        "string.min": MIN_MESSAGE,
        "string.max": MAX_MESSAGE,
        "any.required": REQUIRED_FIELD_MESSAGE,
      }),
  }),
};
