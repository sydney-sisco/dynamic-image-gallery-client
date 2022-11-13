import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_IMAGE = "newImage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

export default function useSocket() {
  const [messages, setMessages] = useState([]); // Sent and received messages
  const socketRef = useRef();

  useEffect(() => {

    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      // query: { roomId },
    });

    // Listens for incoming messages
    socketRef.current.on(NEW_IMAGE, (message) => {
      console.log("message", message);
      setMessages((messages) => [...messages, message]);
    });

    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { messages };
};
