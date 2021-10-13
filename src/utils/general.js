const prettifyMongooseError = (error) => {
  const errors = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [, detail] of Object.entries(error.errors)) {
    errors.push({
      type: detail.name,
      attribute: detail.path,
      message: detail.message,
      value: detail.value,
    });
  }
  return errors;
};

module.exports = { prettifyMongooseError };
