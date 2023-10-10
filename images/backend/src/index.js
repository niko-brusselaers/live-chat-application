import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const Port = process.env.PORT || 3000;
const io = new Server(server)

const Users = [];

server.listen(3000, () => {
    console.log(`listening on http://localhost:${Port}`);
});

io.on('connection', (socket) => {
    
    // socket to make new user
    socket.on('login', (data) => {

        // check if user already exists
        if (!Users.includes(data.newUser)) {
            console.log("new user added");
            // add new user to users array
            Users.push(data.newUser);
            let response = {
                data: "new user added",
                statuscode: 200
            }
            // send response to client
            socket.emit('login', response);
        } else {
            console.log("user already exists");
            let response = {
                data: "user already exists",
                statuscode: 401
            }
            // send error response to client
            socket.emit('login', response);

        }

    })

    // socket to remove user
    socket.on('logout', (data) => {
        Users.splice(Users.indexOf(data.user), 1);
        console.log("user removed");
        // send response to client
        socket.emit('logout', "user removed");
    })

    



});



