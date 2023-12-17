import styles from "./css/Chat.module.css";
import ChatForm from "./ChatForm";
import Message from "./Message";
import { IChatroom } from "../../shared/interfaces/IChatroom";
import { IMessage } from "../../shared/interfaces/IMessage";
import { Socket } from "socket.io-client";
import { useEffect, useState } from "react";

function Chat({chatroom, username, socket}:{chatroom:IChatroom, username:string, socket:Socket}) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        setMessages(chatroom.messages);
    }, [chatroom, messages, setMessages]);


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