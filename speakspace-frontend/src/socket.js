// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://speakspace-api.vercel.app"); // Change URL if deployed
export default socket;
