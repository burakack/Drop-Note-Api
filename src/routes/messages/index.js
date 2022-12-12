const express = require("express");
const router = express.Router();
const db = require("../../database");
const messageservice = require("../../services/messages");
var authmiddleware = require("../../pre_handlers/auth");
router.use(authmiddleware.authenticationmid);
const Joi = require("joi");

GetMessageValidation = Joi.object({
  userid: Joi.number().required(),
  to: Joi.number().required(),
});

PostMessageValidation = Joi.object({
  userid: Joi.number().required(),
  to: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

UpdateMessageValidation = Joi.object({
  userid: Joi.number().required(),
  id: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

DeleteMessageValidation = Joi.object({
  userid: Joi.number().required(),
  to: Joi.number().required(),
});

router
  .route("")
  .get(async (req, res) => {
    const { error } = GetMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var { to, userid } = req.body;
    if (to == userid)
      res.status(400).send("You can't take messages from yourself");
    else {
      messages = await messageservice.getmessages(userid, to);
      res.status(200).send(messages);
    }
  })
  .post(async (req, res) => {
    const { error } = PostMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var { to, message } = req.body;
    messages = await messageservice.createmessages(
      req.body.userid,
      to,
      message
    );
    res.status(200).send(messages);
  })
  .delete(async (req, res) => {
    const { error } = DeleteMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var { id } = req.body;
    messages = await messageservice.deletemessages(req.body.userid, id);
    if (messages == null) res.status(400).send("Message not found");
    res.send(200, messages);
  })
  .put(async (req, res) => {
    const { error } = UpdateMessageValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var { id, message } = req.body;
    messages = await messageservice.updatemessages(
      req.body.userid,
      id,
      message
    );
    res.send(200, messages);
  });
  
router.route("/me").get(async (req, res) => {
  let { userid } = req.body;
  let messages = await messageservice.getusermessages(userid);
  const channels = [{}];
  messages.forEach((message) => {
    kontrol = 1;
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
  res.status(200).send( channelss);
});
module.exports = { prefix: "messages", router };
