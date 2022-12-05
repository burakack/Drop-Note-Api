const express = require("express");
const db = require("./src/database");
require("dotenv").config();
noteservice = require("./src/services/notes");
authmiddleware = require("./src/pre_handlers/auth");
const app = express();
const cors=require("cors");
const messagesocket=require("./src/socket");
app.use(cors());
app.use(express.urlencoded({ extended: true })); // for taking body paramaters
app.use(express.json()); //parsing json like query

const routes = require("./src/routes");
routes.map((route) => {
  app.use(`/${route.prefix}`, route.route);
});

//app.route("/").get((req, res) => {
//  const shell = require("shelljs");
//  shell.exec("./updateproject.sh");
//  res.send({ msg: "GUNCELLENDİ" });
//});

// app.use("/*", function (req, res, next) {
//   res.status(404);
//   res.json({ status: 404, title: "Not Found", msg: "Route not found" });
//   next();
// });
messagesocket.messagesocket(app);
app.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server listening to ${`http://localhost:${process.env.PORT}`} `
  );
});

module.exports = app;
