import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { IUser } from '../shared/models/user';
import { IChatroom } from '../shared/models/chatroom';
import { IMessage } from '../shared/models/message';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const Port = process.env.PORT || 4000;
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const users:IUser[] = [];
const chatrooms:IChatroom[] = [];
let newChatroomID = 0;


server.listen(Port, () => {
    console.log(`listening on http://localhost:${Port}`);
});

io.on('connection', (socket) => {    
    // socket to make new user

    socket.on('login', (data) => {        
        // check if user already exists
        if (users.find(user => user.username === data.newUser) === undefined ) 
        {
            // add new user to users array
            users.push(
                {
                    id: socket.id,
                    username: data.newUser
                }
            );
            let response = {
                data: "new user added",
                userId: socket.id,
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

    

    // socket to send message to other users
    socket.on('message', async(data) => {
        try {            
            console.log(data);
            
        // get chatroom if one exists
        let chatroom = await chatrooms.find(chatroom => chatroom.id === data.chatroomID);
        
        if (!chatroom) {

            // create new chatroom if it doesn't exist
            chatroom = createNewChatroom( [data.sender, ...data.receiver]);
            // send new chatroom to client users            
            let userIds = findIdByName(chatroom.users);
            socket.broadcast.to(userIds).emit('newChatroom', chatroom);
            

        } else {
            let userIds = findIdByName(chatroom.users);
            // send response to client
            socket.broadcast.to(userIds).emit('message', {
                chatroomID: data.chatroomID,
                sender: data.sender,
                message: data.message,
                timestamp: data.timestamp
            });
        
        }

        } catch (error) {
            //catch error
            console.log(error);
        }        
    });

    // socket to remove user when discconected
    socket.on('disconnect', () => {
        // remove user from users array
        let user = users.find(user => user.id === socket.id);
        users.splice(users.findIndex(user => user.id === socket.id), 1);
        //find all chatrooms where disconnected user is a member
        let chatroomsToRemove = chatrooms.filter(chatroom => chatroom.users.includes(user?.username as string));
        // remove user from chatrooms
        chatroomsToRemove.forEach(chatroom => {
            chatroom.users.splice(chatroom.users.findIndex(username => username === user?.username), 1);
            //if chatroom only has 1 user left, remove chatroom
            if (chatroom.users.length === 1) {
                chatrooms.splice(chatrooms.findIndex(chatroom => chatroom.id === chatroom.id), 1);
            }
            //broadcoast to other user of chatroom that user has disconnected
            socket.broadcast.to(findIdByName(chatroom.users)).emit('disconnected', user?.username);
        });

        
    })

    // socket to get all messages from current user
    socket.on('getMessages', (data) => {
        // find all chatrooms where current user is a member
        let userChatrooms = chatrooms.filter(chatroom => chatroom.users.includes(data.username));
        // return all chatrooms to user
        socket.emit('getMessages', userChatrooms);
    })

});



function createNewChatroom( users:string[]):IChatroom{
    // create new chatroom and save to chatrooms array
    let newChatroom = {
        id: newChatroomID,
        users: users,
    }
    chatrooms.push(newChatroom);
    newChatroomID++;

    return newChatroom;
}

function findIdByName(usernames: string[]): string[] {
    // find id of user by username    
    let ids = usernames.map((username: string) => {
        const user = users.find(user => user.username === username);
        return user?.id?.toString() ?? '';
    });    
    return ids;
}

