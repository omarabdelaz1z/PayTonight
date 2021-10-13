const { UNSUPPORTED_MEDIA_TYPE } = require("../utils/responses");

const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json")
    return UNSUPPORTED_MEDIA_TYPE(res, "Content-type must be application/json");

  return next();
};

module.exports = { requireJsonContent };
