const express = require("express");
const router = express.Router();
const RedisService = require("../../redis");
const messageservice = require("../../services/messages");
let authmiddleware = require("../../pre_handlers/auth");
router.use(authmiddleware.authenticationmid);
const Joi = require("joi");

let GetMessageValidation = Joi.object({
  userid: Joi.number().required(),
  anotheruserid: Joi.number().required(),
});

let PostMessageValidation = Joi.object({
  userid: Joi.number().required(),
  to: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

let UpdateMessageValidation = Joi.object({
  userid: Joi.number().required(),
  id: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

let DeleteMessageValidation = Joi.object({
  userid: Joi.number().required(),
  to: Joi.number().required(),
});

router
  .route("")
  .get(async (req, res) => {
    const { error } = GetMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { anotheruserid, userid } = req.body;
    if (anotheruserid == userid)
      res.status(400).send("You can't take messages from yourself");
    else {
      let messages = await messageservice.getmessages(userid, anotheruserid);
      res.status(200).send(messages);
    }
  })
  .post(async (req, res) => {
    const { error } = PostMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { to, message } = req.body;
    if (to != req.body.userid) {
      let messages = await messageservice.createmessages(
        req.body.userid,
        to,
        message
      );
      const redisClient = await new RedisService().getClient();
      await redisClient.lPush(`messages:${to}`, JSON.stringify(messages));
      await redisClient.lPush(
        `messages:${req.body.userid}`,
        JSON.stringify(messages)
      );
      res.status(200).send(messages);
    } else {
      res.status(400).send({ error: "You cant send messages to yourself" });
    }
  })
  .delete(async (req, res) => {
    const { error } = DeleteMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { id } = req.body;
    messages = await messageservice.deletemessages(req.body.userid, id);
    if (messages == null) res.status(400).send("Message not found");
    res.send(200, messages);
  })
  .put(async (req, res) => {
    const { error } = UpdateMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let { id, message } = req.body;
    messages = await messageservice.updatemessages(
      req.body.userid,
      id,
      message
    );
    res.send(200, messages);
  });

router.route("/me").get(async (req, res) => {
  let { userid } = req.body;
  const redisService = await new RedisService().getClient();
  let messages = await redisService.lRange(`messages:${userid}`, 0, -1);
  const channels = [{}];
  messages.forEach((message) => {
    message = JSON.parse(message);
    let kontrol = 1;
    channels.forEach((channel) => {
      //if exist channel
      if (
        (message.fromuser == channel.fromuser &&
          message.touser == channel.touser) ||
        (message.fromuser == channel.touser &&
          message.touser == channel.fromuser)
      ) {
        channel.messages.push(message);
        kontrol = 0;
      }
    });
    if (kontrol) {
      channels.push({
        fromuser: message.fromuser,
        touser: message.touser,
        messages: [message],
      });
    }
  });
  let channelss = channels
    .filter((channel) => {
      if (Object.keys(channel).length !== 0) return true;
    })
    .map((channel) => {
      return {
        users: [channel.fromuser, channel.touser],
        messages: channel.messages,
      };
    });
  res.status(200).send(channelss);
});
module.exports = { prefix: "messages", router };
