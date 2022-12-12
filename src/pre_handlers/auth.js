const tokenservice = require("../services/tokens");
require("dotenv").config();
const redis = require("redis");
require("dotenv").config();
const authentication = async (req, res, next) => {
  const client = redis.createClient(
    {
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
    }
  );
  console.log(client)
  client.on("error", (err) => {
    console.log("Error " + err);
  });
  await client.connect();
  const value = await client.get(req.headers.access_token);
  if (value != undefined) {
    req.body.userid = value;
    next();
  } else {
    tokenn = await tokenservice.gettokenwithvalue(req.headers.access_token);
    if (tokenn == undefined)
      res.send(401, { message: "You must be logged in for this action " });
    else {
      await client.set(req.headers.access_token, tokenn.userid);
      await client.disconnect();
      req.body.userid = tokenn.userid;
      next();
    }
  }
};
module.exports.authenticationmid = authentication;
