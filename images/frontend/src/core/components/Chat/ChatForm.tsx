import styles from "./css/chatForm.module.css";


function ChatForm() {
    return ( 
        <form className={styles.chatForm} >
            <input type="text" placeholder="Type a message" />
            <button type="submit">Submit</button>
        </form>
     );
}

export default ChatForm;