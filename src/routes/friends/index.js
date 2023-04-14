const express = require("express");
const router = express.Router();
const friendservice = require("../../services/friends");
const authmiddleware = require("../../pre_handlers/auth");

router.use(authmiddleware.authenticationmid);

router
  .route("")
  .get(async (req, res) => {
    friends = await friendservice.getfriend(req.body.userid);
    res.send(200, friends);
  })
  .post(async (req, res) => {
    var { requester_id } = req.body;
    friends = await friendservice.createfriend(req.body.userid, requester_id);
    res.send(200, friends);
  })
  .delete(async (req, res) => {
    var { requester_id } = req.body;
    friends = await friendservice.deletefriend(req.body.userid, requester_id);
    res.send(200, friends);
  });

module.exports = { prefix: "friends", router };
