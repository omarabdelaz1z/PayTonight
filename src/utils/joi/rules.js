const Joi = require("joi");
const sanitize = require("sanitize-html");
const { isValidObjectId } = require("mongoose");
const { MALFORMED_INPUT_MESSAGE } = require("./messages");

module.exports = {
  Sanitized: (value, helpers) => {
    const clean = sanitize(value, {
      allowedAttributes: [],
      allowedTags: [],
      selfClosing: [],
      allowedSchemes: [],
    });

    return typeof clean !== "undefined"
      ? clean
      : helpers.message(MALFORMED_INPUT_MESSAGE);
  },

  ObjectId: () =>
    Joi.string()
      .trim()
      .min(1)
      .custom((value, helpers) => {
        try {
          return isValidObjectId(value)
            ? value
            : helpers.message("ID doesn't conform to ObjectId");
        } catch (error) {
          return helpers.message("ID doesn't conform to ObjectId");
        }
      }),
};

// Sanitized: () =>
//   Joi.string().custom((value, helpers) => {
//     const clean = sanitize(value, {
//       allowedAttributes: [],
//       allowedTags: [],
//       selfClosing: [],
//       allowedSchemes: [],
//     });

//     return typeof clean !== "undefined"
//       ? clean
//       : helpers.message(MALFORMED_INPUT_MESSAGE);
//   }),

// ObjectId: () =>
//   Joi.string()
//     .trim()
//     .min(1)
//     .custom((value, helpers) => {
//       try {
//         return isValidObjectId(value)
//           ? value
//           : helpers.message("ID doesn't conform to ObjectId");
//       } catch (error) {
//         return helpers.message("ID doesn't conform to ObjectId");
//       }
//     }),
