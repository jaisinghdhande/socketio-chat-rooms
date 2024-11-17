const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = 4000;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    //*-* Use this to emit to all the clients
    //socket.broadcast.emit("receive_message", data);

    //*-* Use this to emit to all the clients of a specific room
    console.log(`Sending data to  only room : ${data.room}`);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("join_room", (data) => {
    console.log(`Received request to join room: ${data.room}`);
    socket.join(data.room);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
