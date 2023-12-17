import { IMessage } from "../../shared/interfaces/IMessage";
import styles from "./css/message.module.css";

function Message({message, currentUser}:{message:IMessage, currentUser:string}) {
    

    return ( 
        (message.sender === currentUser) ?
        <div className={styles.messageCurrentSender}>
            <div>
                <p>{message.sender}</p>
                <p>{message.timestamp.toString()}</p>
            </div>
            <p className={styles.messageContent}>
                {message.message}
            </p>
        </div>
        :
        <div className={styles.message}>
            <div>
                <p>
                    {message.sender}
                </p>
                <p>{message.timestamp.toString()}</p>
            </div>
            <p className={styles.messageContent}>
                {message.message}
            </p>
        </div>
    );
}

export default Message;