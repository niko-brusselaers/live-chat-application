import { IMessage } from "../../shared/interfaces/message";
import styles from "./css/message.module.css";

function Message({message}:{message:IMessage}) {
    const currentUser = 'John';
    

    return ( 
        (message.Sender === currentUser) ?
        <div className={styles.messageCurrentSender}>
            <div>
                <p>{message.Sender}</p>
                <p>{message.Time}</p>
            </div>
            <p className={styles.messageContent}>
                {message.Content}
            </p>
        </div>
        :
        <div className={styles.message}>
            <div>
                <p>
                    {message.Sender}
                </p>
                <p>{message.Time}</p>
            </div>
            <p className={styles.messageContent}>
                {message.Content}
            </p>
        </div>
    );
}

export default Message;