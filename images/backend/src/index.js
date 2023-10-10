import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const Port = process.env.PORT || 3000;
const io = new Server(server)

app.use(cors());

server.listen(3000, () => {
    console.log(`listening on http://localhost:${Port}`);
});