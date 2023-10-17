const express = require("express");
const router = express.Router();
const friendservice = require("../../services/friends");
const authmiddleware = require("../../pre_handlers/auth");

router.use(authmiddleware.authenticationmid);

router
  .route("")
  .get(async (req, res) => {
    let friends = await friendservice.getfriend(req.body.userid);
    res.status(200).send(friends);
  })
  .post(async (req, res) => {
    let { requester_id } = req.body;
    if (!requester_id) {
      res.status(400).send({ message: "requester_id is required" });
    } else {
      let friends = await friendservice.createfriend(
        req.body.userid,
        requester_id,
      );
      res.status(200).send(friends);
    }
  })
  .delete(async (req, res) => {
    let { requester_id } = req.body;
    if (!requester_id)
      res.status(400).send({ message: "requester_id is required" });
    else {
      let friends = await friendservice.deletefriend(
        req.body.userid,
        requester_id,
      );
      res.status(200).send(friends);
    }
  });

module.exports = { prefix: "friends", router };
