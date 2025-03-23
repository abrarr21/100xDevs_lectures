import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6969 });

wss.on("connection", function (socket) {
  console.log("User connected");
  // setInterval(() => {
  //   socket.send(`The current random price is: ${Math.random()}`);
  // }, 500);

  socket.on("message", (e) => {
    console.log(e.toString());
    if (e.toString() === "ping") {
      socket.send("pong");
    }
  });
});
