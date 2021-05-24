import io from "socket.io-client";

const SOCKET_ADDRESS = "http://localhost:3001";
const socket = io(SOCKET_ADDRESS, {autoConnect: false});

export default socket;
