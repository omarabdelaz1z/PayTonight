const { customAlphabet } = require("nanoid");

const prettifyMongooseError = (error) => {
  const prettyError = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [, detail] of Object.entries(error.errors))
    prettyError[detail.path] = detail.message;

  return prettyError;
};

const generateApiKey = () => {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    30
  );

  return nanoid();
};

const formatError = (error) => {
  if (
    (Array.isArray(error) && error.length === 0) ||
    typeof error === "undefined" ||
    !error
  )
    return undefined;

  return typeof error[0] !== "string" ? Object.values(error[0])[0] : error[0];
};

module.exports = { prettifyMongooseError, generateApiKey, formatError };
