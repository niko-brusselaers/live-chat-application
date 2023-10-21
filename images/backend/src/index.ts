import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { IUser } from '../shared/models/user';
import { IChatroom } from '../shared/models/chatroom';
import { IMessage } from '../shared/models/message';

const app = express();
const server = http.createServer(app);
const Port = process.env.PORT || 3000;
const io = new Server(server)

const users:IUser[] = [];
const chatrooms:IChatroom[] = [];
let newChatroomID = 0;
let newMessageID = 0;


server.listen(3000, () => {
    console.log(`listening on http://localhost:${Port}`);
});

io.on('connection', (socket) => {    
    // socket to make new user

    socket.on('login', (data) => {
        // check if user already exists
        if (users.find(user => user.username === data.newUser) === undefined 
            && users.find(user => user.id === socket.id) === undefined) 
        {
            console.log("new user added");            
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
    socket.on('message', (data) => {
        try {
            
        // get chatroom if one exists
        let chatroom = chatrooms.find(chatroom => chatroom.id === data.chatroomID);
        
        if (!chatroom) {
            // create new chatroom if it doesn't exist
            chatroom = createNewChatroom(data.chatroomName, [data.sender, ...data.receiver]);
        }
        // add message to chatroom
        chatroom.messages.push(
            {
                id: newMessageID,
                sender: data.sender,
                message: data.message
            }
        )
        newMessageID++;

        
        // send response to client
        socket.broadcast.to(findIdByName(chatroom.users)).emit('message', chatroom);
        

        } catch (error) {
            //catch error
            console.log(error);
        }        
    });

    

});



function createNewChatroom(name:string, users:string[]):IChatroom{
    // create new chatroom and save to chatrooms array
    let newChatroom = {
        id: newChatroomID,
        name: name,
        users: users,
        messages: []
    }
    chatrooms.push(newChatroom);
    newChatroomID++;

    return newChatroom;
}

function findIdByName(usernames: string[]): string[] {
    // find id of user by username
    let ids = usernames.map((username: string) => (users.find(user => user.username === username)?.id ).toString());
    return ids;
}

