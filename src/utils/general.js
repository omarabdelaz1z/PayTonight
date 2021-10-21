const prettifyMongooseError = (error) => {
  const prettyError = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [, detail] of Object.entries(error.errors))
    prettyError[detail.path] = detail.message;

  return prettyError;
};

module.exports = { prettifyMongooseError };
