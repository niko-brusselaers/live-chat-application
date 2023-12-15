import { IMessage } from "../../shared/interfaces/message";
import styles from "./css/Chat.module.css";
import ChatForm from "./ChatForm";
import Message from "./Message";

const messages: IMessage[] = [];

function Chat() {
    return ( 
        <div className={styles.chatContainer}>
            <div className={styles.chatBox}>
                {(messages.map((message,index)=> <Message message={message}  key={index}/>))}
            </div>
            <ChatForm/>
        </div>
     );
}

export default Chat;