import { io } from "socket.io-client";

export const initSocket = async () => {
  const options = {
    "force new connection": false,
    reconnectionAttempt: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io(process.env.REACT_APP_BASE_URL, options);
};
