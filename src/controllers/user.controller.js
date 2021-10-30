const generateApiKey = require('generate-api-key');
const { StatusCodes } = require("http-status-codes");
const { createKey } = require("../models/User");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../utils/responses");
const { ServerError } = require("../utils/error-handler");


const registerKey = async (req, res) => {
  const apiKey = generateApiKey({ method: 'bytes' });

  try {
    const {userID} = req?.params;
    const newApp = {
      $set: {
        apikey:apiKey,
      },
    };
    const result = await createKey(userID, newApp);
    if (result === null || typeof result === "undefined")
      return BAD_REQUEST(res, "Could not add app");

    return res.status(StatusCodes.CREATED).redirect("/dashboard");
  } catch (error) {
    if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
    return res.send(error);
  }
};

module.exports = { registerKey };
