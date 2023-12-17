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

  useEffect(() => {
      socket.on("newChatroom", (data:IChatroom)=>{
        if(!chatrooms.includes(data)){
          data.newMessages = 1;
          setChatrooms([...chatrooms, data]);
        }
        console.log(chatrooms);
        
      })
  }, [userName, socket])


  function setCreateChatroomModal(value:boolean){
    console.log(value);
    
    setCreateChatroom(value);
  }

  return (
    <div className="vw-100 vh-100 bg-dark d-flex flex-row" >
      {userName? null : <LoginModal setUsername={setUserName} socket={socket}/>}
      {createChatroom? <CreateChatRoomModal createChatroomModal={setCreateChatroomModal} socket={socket} username={userName as string}/> : null}
      <SideNav chatrooms={chatrooms}  createChatroom={setCreateChatroomModal}/>
      <Chat/>
    </div>

  );
}

export default App;
