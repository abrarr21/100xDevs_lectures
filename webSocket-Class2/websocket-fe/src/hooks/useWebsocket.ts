import { useEffect, useRef, useState } from "react";

export const useWebsocket = (url: string) => {
  const [message, setMessage] = useState([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onmessage = (event) => {
      setMessage((msg) => [...msg, event.data]);
    };
    ws.onclose = () => console.log("Disconnected");

    wsRef.current = ws;

    return () => {
      if (wsRef.current) {
        wsRef.current?.close();
      }
    };
  }, [url]);

  const sendMessage = (message: object) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    }
  };

  return { message, sendMessage };
};
