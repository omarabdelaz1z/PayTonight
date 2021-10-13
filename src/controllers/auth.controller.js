const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { findUser, createUser } = require("../models/User");
const { ServerError } = require("../utils/error-handler");
const { prettifyMongooseError } = require("../utils/general");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../utils/responses");

function destructUser({ id, username, email, organization }) {
  return { id, username, email, organization };
}

const login = async (req, res) => {
  try {
    const user = await findUser({ username: req.body.username });
    console.log(user);

    const match = await bcrypt.compare(req?.body?.password, user?.password);

    if (typeof user === "undefined" || !match)
      return BAD_REQUEST(res, "Invalid username/ password");

    return res.status(StatusCodes.OK).json(destructUser(user));
  } catch (error) {
    if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
    console.log(error);
    return res.send(error);
  }
};

const register = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 14);
    req.body.password = hash;

    const created = await createUser(req.body);
    return res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);

    if (error?.errors)
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json(prettifyMongooseError(error));

    return res.status(StatusCodes.BAD_REQUEST).send(error);
  }
};

module.exports = {
  login,
  register,
};
