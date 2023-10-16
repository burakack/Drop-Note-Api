const express = require("express");
require("dotenv").config();
const app = express();
const messagesocket = require("./src/socket");
app.use(express.urlencoded({ extended: true })); // for taking body paramaters
app.use(express.json()); //parsing json like query
const http = require("http");
const server = http.createServer(app);

const routes = require("./src/routes");
routes.forEach((route) => {
  app.use(`/${route.prefix}`, route.route);
});

app.route("/").post((req, res) => {
  const shell = require("shelljs");
  shell.exec("./updateproject.sh");
  return res.send({ msg: "GUNCELLENDİ" });
});

app.use("/*", function (req, res, next) {
  res.status(404);
  res.json({ status: 404, title: "Not Found", msg: "Route not found" });
  next();
});

messagesocket.messagesocket(server);

server.listen(process.env.PORT, () => {
  console.log(
    `🚀 Server listening to http://localhost:${process.env.PORT} `
  );
});

module.exports = app;
