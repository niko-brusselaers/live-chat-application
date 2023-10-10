import React from 'react';
import './App.css';
import SideNav from './core/components/navigation/SideNav';
import { ISideNavChats } from './core/shared/interfaces/sideNavChats';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chat from './core/components/Chat/Chat';

const userChats: ISideNavChats[] = [
  {
    user: 'John',
    newMessages: 2,
  },
  {
    user: 'Jane',
    newMessages: 0,
  },
  {
    user: 'Bob',
    newMessages: 0,
  },
  {
  user: 'Emily',
  newMessages: 0,
  },

  {
  user: 'Michael',
  newMessages: 5,
  },

  {
  user: 'Sarah',
  newMessages: 1,
  },

  {
  user: 'David',
  newMessages: 3,
  },

  {
  user: 'Sophia',
  newMessages: 0,
  },

  {
  user: 'Daniel',
  newMessages: 2,
  },

  {
  user: 'Olivia',
  newMessages: 4,
  },

  {
  user: 'William',
  newMessages: 1,
  },

  {
  user: 'Ava',
  newMessages: 0,
  },
];

function App() {
  return (
    <div className="vw-100 vh-100 bg-dark d-flex flex-row" >
      <SideNav userChats={userChats} />
      <Chat/>
    </div>

  );
}

export default App;
