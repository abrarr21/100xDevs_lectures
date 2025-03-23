import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState();
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:6969");
    setSocket(ws);

    ws.onmessage = (ev) => {
      alert(ev.data);
    };
  }, []);

  const sendMessage = () => {
    if (!socket) {
      return;
    }
    const message = inputRef.current.value;
    socket.send(message);
  };

  return (
    <>
      <div>Hello there</div>
      <input ref={inputRef} type="text" placeholder="Enter your text" />
      <button onClick={sendMessage}>SEND</button>
    </>
  );
}

export default App;
