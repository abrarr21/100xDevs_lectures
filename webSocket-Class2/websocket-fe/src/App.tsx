import { useState } from "react";
import { useWebsocket } from "./hooks/useWebsocket";

function App() {
  const { message, sendMessage } = useWebsocket("http://localhost:6969");
  const [room, setRoom] = useState("");
  const [msg, setMsg] = useState("");

  const joinRoom = () => {
    sendMessage({ type: "join", payload: { roomId: room } });
  };

  const sendChat = () => {
    sendMessage({ type: "chat", payload: { message: msg } });
    setMsg("");
  };

  return (
    <>
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <div className="w-1/3 h-4/5 border border-white rounded-md">
          <h1 className="text-white text-4xl text-center mt-1">
            WebSocket Chat
          </h1>

          <div className="flex gap-4 items-center justify-center mt-4 py-5">
            <input
              onChange={(e) => setRoom(e.target.value)}
              className=" p-2 rounded-lg"
              type="text"
              placeholder="Enter the room Id"
            />
            <button onClick={joinRoom} className="bg-slate-500 p-2 rounded-lg">
              Join Room
            </button>
          </div>
          <div className="w-full h-2/3 mt-1  overflow-y-auto">
            {message.length > 0 ? (
              message.map((m, i) => (
                <div className="m-4">
                  <span key={i} className={`rounded-md bg-white p-1`}>
                    {m}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-white flex justify-center mt-44 text-3xl">
                No Message Yet
              </p>
            )}
          </div>
          <input
            onChange={(e) => setMsg(e.target.value)}
            className="w-10/12 h-10  mt-1 ml-1 rounded-md"
            type="text"
            placeholder="Type your Message"
          />
          <button
            onClick={sendChat}
            className="bg-slate-500 p-2 rounded-lg ml-3 text-white font-bold"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
