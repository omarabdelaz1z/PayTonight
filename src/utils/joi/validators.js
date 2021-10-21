const Joi = require("joi");
const sanitize = require("sanitize-html");
const { MALFORMED_INPUT_MESSAGE } = require("./messages");

module.exports = {
  customJoi: Joi.extend((joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
      "string.htmlStripped": MALFORMED_INPUT_MESSAGE,
    },
    rules: {
      htmlStripped: {
        validate(value, helpers) {
          const clean = sanitize(value, {
            allowedAttributes: [],
            allowedTags: [],
            selfClosing: [],
            allowedSchemes: [],
          });

          return typeof clean !== "undefined"
            ? clean
            : helpers.error("string.htmlStripped");
        },
      },
    },
  })),
};
