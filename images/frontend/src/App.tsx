import React, { useEffect, useState } from 'react';
import './App.css';
import SideNav from './core/components/navigation/SideNav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './core/components/Chat/Chat';
import LoginModal from './core/components/loginModal/LoginModal';
import {  io } from 'socket.io-client';
import { IChatroom } from './core/shared/interfaces/IChatroom';
import CreateChatRoomModal from './core/components/CreateChatroomModal/CreateChatroomModal';

function App() {
  const [userName, setUserName] = useState<string|undefined>(undefined);
  const socket = io(process.env.REACT_APP_BACKEND_URL as string);
  const [chatrooms, setChatrooms] = useState<IChatroom[]>([]); 
  const [createChatroom, setCreateChatroom] = useState<boolean>(false);
  const [focusedChatId, setFocusedChatId] = useState<number|undefined>(undefined);
  const [focusedChat, setFocusedChat] = useState<IChatroom| undefined>(undefined);

  useEffect(() => {
      socket.on("newChatroom", (data:IChatroom)=>{
        if(!chatrooms.find(chatroom => chatroom.id === data.id)){
          data.newMessages = 1;
          data.messages = [];
          setChatrooms([...chatrooms, data]);
        }        
      })

    socket.on("message", (data: { chatroomID: number, message: string, sender: string, timestamp: Date }) => {
      console.log(data);
      
        setChatrooms(prevChatrooms => {
            const updatedChatrooms = prevChatrooms.map(chatroom => {
                if (chatroom.id === data.chatroomID) {
                    const newMessage = {
                        message: data.message,
                        sender: data.sender,
                        timestamp: data.timestamp
                    };

                    const newMessages = chatroom.id !== focusedChatId ? chatroom.newMessages + 1 : 0;

                    return {
                        ...chatroom,
                        messages: [...chatroom.messages, newMessage],
                        newMessages
                    };
                }
                return chatroom;
            });

            return updatedChatrooms;
        });
    });

}, [socket, chatrooms, focusedChat, focusedChatId, setFocusedChat, setFocusedChatId]);


  function changeFocusedChat(id:number){
    setFocusedChatId(id);
    const chatroom = chatrooms.find(chatroom => chatroom.id === id);
    if(chatroom)chatroom.newMessages = 0;
    setChatrooms([...chatrooms]);
    setFocusedChat(chatroom);
  }

  function setCreateChatroomModal(value:boolean){
    console.log(value);
    
    setCreateChatroom(value);
  }

  return (
    <div className="vw-100 vh-100 bg-dark d-flex flex-row" >
      {userName? null : <LoginModal setUsername={setUserName} socket={socket}/>}
      {createChatroom? <CreateChatRoomModal createChatroomModal={setCreateChatroomModal} socket={socket} username={userName as string}/> : null}
      <SideNav chatrooms={chatrooms}  createChatroom={setCreateChatroomModal} changeFocusedChat={changeFocusedChat}/>
      {focusedChat? <Chat chatroom={focusedChat} socket={socket} username={userName as string}/> : null}
    </div>

  );
}

export default App;
