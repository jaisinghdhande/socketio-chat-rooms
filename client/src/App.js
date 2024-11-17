import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const socket = io("http://localhost:4000");

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  const joinRoom = () => {
    console.log(`Sending request to join room: ${room}`);
    socket.emit("join_room", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setReceivedMessage(data.message);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Send Message"
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send</button>
      <input
        placeholder="Enter room"
        onChange={(e) => setRoom(e.target.value)}
      ></input>
      <button onClick={joinRoom}>Join</button>
      {receivedMessage}
    </div>
  );
}

export default App;
