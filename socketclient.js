io = require("socket.io-client");
var socket = io("http://localhost:3000", {
  transports: ["websocket"],
});
socket.on("connect", function () {
  console.log("connected");
});
