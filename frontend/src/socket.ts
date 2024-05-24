import { io } from 'socket.io-client';

const socketUrl: any = process.env.REACT_APP_SOCKET_LINK;
export const socket = io(socketUrl);
