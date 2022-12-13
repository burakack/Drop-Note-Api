const tokenservice = require("../services/tokens");
require("dotenv").config();
const redis = require("redis");
const RedisService = require("../redis");
const authentication = async (req, res, next) => {
  const redisService =await new RedisService().getClient();
  const value = await redisService.get(req.headers.access_token);
  if (value != undefined) {
    req.body.userid = value;
    next();
  } else {
    tokenn = await tokenservice.gettokenwithvalue(req.headers.access_token);
    if (tokenn == undefined)
      res.send(401, { message: "You must be logged in for this action " });
    else {
      await redisService.setEx(req.headers.access_token,3600,tokenn.userid);
      req.body.userid = tokenn.userid;
      next();
    }
  }
}; 
module.exports.authenticationmid = authentication;
