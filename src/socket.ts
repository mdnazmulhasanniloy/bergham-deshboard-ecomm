import { io } from "socket.io-client";
// import config from "./config";
const URL = import.meta.env.REACT_APP_SOCKET_URL;

export const socket = io(URL);
