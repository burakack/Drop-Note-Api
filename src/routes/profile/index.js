const express = require("express");
const router = express.Router();
const userservice = require("../../services/users");
const tokenservice = require("../../services/tokens");
const noteservice = require("../../services/notes");
const cryptojs = require("crypto-js");
const { response } = require("express");
let authmiddleware = require("../../pre_handlers/auth");
const Joi = require("joi");

let RegisterValidation = Joi.object({
  nickname: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  cpassword: Joi.string().min(6).max(1024).required(),
});

let LoginValidation = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

router.post("/register", async (req, res) => {
  const { error } = RegisterValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const { nickname, email, password, cpassword } = req.body;
  let useremail = await userservice.getuserwithemail(email);
  let usernickname = await userservice.getuserwithnickname(nickname);
  response.error = "";
  if (useremail.message != "User not found email") {
    response.error += "E-mail need to be unique ";
  }

  if (usernickname.message != "User not found nickname") {
    response.error += "Nickname need to be unique ";
  }
  if (password != cpassword) {
    response.error += "E-mail need to be unique ";
  }
  if (response.error != "") {
    res.status(400).send(response);
  } else {
    let user = await userservice.createuser(nickname, email, password);
    res.status(201).send(user);
  }
});
router.post("/login", async (req, res) => {
  const { error } = LoginValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let { email, password } = req.body;
  let user = await userservice.getuserwithemail(email);
  if (user.message != "User not found email") {
    let token = await tokenservice.createtoken(user.id);
    let hash = user.password_hash;
    let salt = user.password_salt;
    let dbpassword = cryptojs.AES.decrypt(hash, salt).toString(
      cryptojs.enc.Utf8,
    );
    if (dbpassword == password)
      res.status(200).send({ message: "LOGGED İN", token: token });
    else res.status(401).send({ message: "WRONG PASSWORD" });
  } else
    res
      .status(401)
      .send({ message: "There is no registered user with this email " });
});

router.get("/:id", async (req, res) => {
  let user = await userservice.getuserwithid(req.params.id);
  if (user.message != "User not found id") res.status(200).send(user);
  else res.status(404).send({ message: "User not found id" });
});

router.get("/:slug/notes", async (req, res) => {
  let userandnotes = await noteservice.getnotebynickname(req.params.slug);
  if (userandnotes.message != "User not found nickname")
    res.status(200).send(userandnotes);
  else res.status(404).send({ message: "User not found nickname" });
});

router.use(authmiddleware.authenticationmid);

router.get("", async (req, res) => {
  let tokenn = await tokenservice.gettokenwithvalue(req.headers.access_token);
  let user = await userservice.getuserwithid(tokenn.userid);
  if (user.message != "User not found id") res.status(200).send(user);
  else res.status(404).send({ message: "User not found id" });
});
module.exports = { prefix: "profile", router };
