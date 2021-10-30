const {findUser} = require("../models/User");
const {ServerError} = require("../utils/error-handler");
const {INTERNAL_SERVER_ERROR} = require("../utils/responses");

const loginRequired = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect("/");
};

const isAlreadyLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect("/dashboard");
  return next();
};

const authCall = async (req,res,next) =>{
    const {username} = req.body;
    try {
      const user = await findUser({username});
      const {apikey} = user;
      return req.headers.apikey === apikey? next(): res.json({message:"Invalid API Key"});
    }catch (error){
      if (error instanceof ServerError) return INTERNAL_SERVER_ERROR(res);
      return res.send(error);
    }
}
module.exports = { loginRequired, isAlreadyLoggedIn, authCall };
