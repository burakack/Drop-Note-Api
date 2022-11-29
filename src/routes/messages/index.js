const express = require("express");
const router = express.Router();
const db = require("../../database");
const messageservice = require("../../services/messages");
var authmiddleware = require("../../pre_handlers/auth");
router.use(authmiddleware.authenticationmid);
const Joi = require("joi");

GetMessageValidation = Joi.object({
  to: Joi.number().required(),
});

PostMessageValidation = Joi.object({
  to: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

UpdateMessageValidation = Joi.object({
  id: Joi.number().required(),
  message: Joi.string().min(1).max(255).required(),
});

DeleteMessageValidation = Joi.object({
  to: Joi.number().required(),
});

router
  .route("")
  .get(async (req, res) => {
    GetMessageValidation.validateAsync(req.body);
    var { to } = req.body;
    if (to == req.body.userid)
      res.status(400).send("You can't take messages from yourself");
    if (to == null) {
      res.status(400).send("to paramater can't be null");
    } else {
      messages = await messageservice.getmessages(req.body.userid, to);
      res.status(200).send(messages);
    }
  })
  .post(async (req, res) => {
    PostMessageValidation.validateAsync(req.body);
    var { to, message } = req.body;
    if (to == null) {
      res.status(400).send("to paramater can't be null");
    } else if (message == null) {
      res.status(400).send("message paramater can't be null");
    } else {
      messages = await messageservice.createmessages(
        req.body.userid,
        to,
        message
      );
      res.status(200).send(messages);
    }
  })
  .delete(async (req, res) => {
    DeleteMessageValidation.validateAsync(req.body);
    var { id } = req.body;
    messages = await messageservice.deletemessages(req.body.userid, id);
    res.send(200, messages);
  })
  .put(async (req, res) => {
    UpdateMessageValidation.validateAsync(req.body);
    var { id, message } = req.body;
    messages = await messageservice.updatemessages(
      req.body.userid,
      id,
      message
    );
    res.send(200, messages);
  });
module.exports = { name: "messages", router };
