const {Server} = require("socket.io");
const messageservice = require("../services/messages");
const tokenservice = require("../services/tokens");

function messagesocket(server) {
  const io = new Server(server);
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("message", async (data) => { 
      let { token, to, text }= data
      let tokenn = await tokenservice.gettokenwithvalue(token);
      if (tokenn == undefined)
      {
        socket.emit("error", { msg: "Token not found" });
      }
      else {
        userid = tokenn.userid;
        console.log(userid);
        await messageservice.createmessages(userid, to, text);
        io.emit("message", { userid, to, text });
      }
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}
module.exports ={
  messagesocket
} 
