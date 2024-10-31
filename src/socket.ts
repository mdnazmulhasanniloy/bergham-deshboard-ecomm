import { io } from "socket.io-client";
// import config from "./config";
const URL =
  import.meta.env.REACT_APP_SOCKET_URL || "http://115.127.156.14:5005";

export const socket = io("http://115.127.156.14:5005");
