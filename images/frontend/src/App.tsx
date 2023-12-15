import React from 'react';
import './App.css';
import SideNav from './core/components/navigation/SideNav';
import { ISideNavChats } from './core/shared/interfaces/sideNavChats';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './core/components/Chat/Chat';
import LoginModal from './core/components/loginModal/LoginModal';
import {  io } from 'socket.io-client';

const userChats: ISideNavChats[] = [];

function App() {
  const [userName, setUserName] = React.useState<string|undefined>(undefined);
  const socket = io(process.env.REACT_APP_BACKEND_URL as string);

  return (
    <div className="vw-100 vh-100 bg-dark d-flex flex-row" >
      {userName? null : <LoginModal setUsername={setUserName} socket={socket}/>}
      <SideNav userChats={userChats} />
      <Chat/>
    </div>

  );
}

export default App;
