const { ReasonPhrases, StatusCodes } = require("http-status-codes");

module.exports = {
  NOT_FOUND: (res, error) =>
    res.status(StatusCodes.NOT_FOUND).json({
      error: error || ReasonPhrases.NOT_FOUND,
      code: "NOT_FOUND",
    }),

  BAD_REQUEST: (res, error) =>
    res.status(StatusCodes.BAD_REQUEST).json({
      error: error || ReasonPhrases.BAD_REQUEST,
      code: "BAD_REQUEST",
    }),

  UNAUTHORIZED: (res, error) =>
    res.status(StatusCodes.UNAUTHORIZED).json({
      error: error || ReasonPhrases.UNAUTHORIZED,
      code: "UNAUTHORIZED",
    }),

  METHOD_NOT_ALLOWED: (res, error) =>
    res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
      error: error || ReasonPhrases.METHOD_NOT_ALLOWED,
      code: "METHOD_NOT_ALLOWED",
    }),

  INTERNAL_SERVER_ERROR: (res, error) =>
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error || ReasonPhrases.INTERNAL_SERVER_ERROR,
      code: "INTERNAL_SERVER_ERROR",
    }),

  UNSUPPORTED_MEDIA_TYPE: (res, error) =>
    res.status(StatusCodes.UNSUPPORTED_MEDIA_TYPE).json({
      error: error || ReasonPhrases.UNSUPPORTED_MEDIA_TYPE,
      code: "UNSUPPORTED_MEDIA_TYPE",
    }),

  FORBIDDEN: (res, error) =>
    res.status(StatusCodes.FORBIDDEN).json({
      error: error || "You are not authorized to access the content.",
      code: "FORBIDDEN",
    }),
};
