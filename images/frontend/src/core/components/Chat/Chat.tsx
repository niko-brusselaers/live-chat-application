import styles from "./css/Chat.module.css";
import ChatForm from "./ChatForm";
import Message from "./Message";
import { IChatroom } from "../../shared/interfaces/IChatroom";
import { IMessage } from "../../shared/interfaces/IMessage";
import { Socket } from "socket.io-client";

function Chat({chatroom, username, socket}:{chatroom:IChatroom, username:string, socket:Socket}) {


    return ( 
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {chatroom.messages.map((message:IMessage,index:number)=> <Message key={index} message={message} currentUser={username}/>)}
            </div>
            <ChatForm username={username} chatroomId={chatroom.id} socket={socket} />
        </div>
     );
}

export default Chat;