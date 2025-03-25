// import { WebSocket, WebSocketServer } from "ws";
//
// const wss = new WebSocketServer({ port: 6969 });
//
// let userCount = 0;
// let allSocket: WebSocket[] = [];
//
// wss.on("connection", (socket) => {
//   userCount += 1;
//   allSocket.push(socket);
//   console.log(`User Connected : #${userCount}`);
//
//   socket.on("message", (message) => {
//     console.log(`From Client: ${message.toString()}`);
//
//     // for (let i = 0; i < allSocket.length; i++) {
//     //   const s = allSocket[i];
//     //   s.send(`From Server: ${message.toString()}`);
//     // }
//     allSocket.forEach((s) => {
//       s.send(`${message.toString()} : from SERVER`);
//     });
//   });
//
//   socket.on("disconnect", () => {
//     allSocket = allSocket.filter((x) => x != socket);
//   });
// });

import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 6969 });

interface User {
  socket: WebSocket;
  room: string;
}

const allSocket: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message as unknown as string);
    if (parsedMessage.type == "join") {
      console.log("User joined the room : " + parsedMessage.payload.roomId);
      allSocket.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type == "chat") {
      console.log("User wants to chat");
      // const currentUserRoom = allSocket.find((x) => x.socket == socket).room

      let currentUserRoom = null;
      for (let i = 0; i < allSocket.length; i++) {
        if (allSocket[i].socket == socket) {
          currentUserRoom = allSocket[i].room;
        }
      }

      for (let i = 0; i < allSocket.length; i++) {
        if (allSocket[i].room == currentUserRoom) {
          allSocket[i].socket.send(parsedMessage.payload.message);
        }
      }
    }
  });
});
