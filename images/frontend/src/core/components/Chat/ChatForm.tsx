import { Socket } from "socket.io-client";
import styles from "./css/chatForm.module.css";
import { useState } from "react";


function ChatForm({username,chatroomId, socket}:{username:string,chatroomId:number, socket:Socket}) {
    const [message, setMessage] = useState<string>("");

    function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();        
        socket.emit('message', {
            chatroomID: chatroomId,
            sender: username,
            message: message,
            timestamp: new Date()
        });
    }


    return ( 
        <form className={styles.chatForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Type a message" onChange={(event) => {setMessage(event.currentTarget.value)}}/>
            <button type="submit">Submit</button>
        </form>
     );
}

export default ChatForm;