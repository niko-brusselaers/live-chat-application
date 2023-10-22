import { IMessage } from "../../shared/interfaces/message";
import styles from "./css/Chat.module.css";
import ChatForm from "./ChatForm";
import Message from "./Message";

const messages: IMessage[] = [
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Hey Emily, how are you?',
    Time: '2023-10-09 10:00:00',
    Read: true,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Hi John! I\'m doing well, thanks. How about you?',
    Time: '2023-10-09 10:05:00',
    Read: true,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: "I'm good too, thanks for asking. Any plans for the weekend?",
    Time: '2023-10-09 10:10:00',
    Read: false,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: "Not sure yet. Maybe catch a movie. How about you?",
    Time: '2023-10-09 10:15:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: "That sounds like a plan! Let's do it.",
    Time: '2023-10-09 10:20:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'What movie do you want to watch?',
    Time: '2023-10-09 10:25:00',
    Read: false,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'I heard there\'s a new action movie in town. Want to check it out?',
    Time: '2023-10-09 10:30:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Sounds like a plan! How about Saturday evening?',
    Time: '2023-10-09 10:35:00',
    Read: false,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Saturday evening works for me. Let\'s meet at the theater at 7 PM.',
    Time: '2023-10-09 10:40:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Great! I\'ll book the tickets. See you on Saturday!',
    Time: '2023-10-09 10:45:00',
    Read: false,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Looking forward to it! Have a great day, John!',
    Time: '2023-10-09 10:50:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'You too, Emily! Take care.',
    Time: '2023-10-09 10:55:00',
    Read: false,
  },
  {
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Goodbye!',
    Time: '2023-10-09 11:00:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Goodbye, Emily!',
    Time: '2023-10-09 11:05:00',
    Read: false,
  },{
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Goodbye!',
    Time: '2023-10-09 11:00:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Goodbye, Emily!',
    Time: '2023-10-09 11:05:00',
    Read: false,
  },{
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Goodbye!',
    Time: '2023-10-09 11:00:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Goodbye, Emily!',
    Time: '2023-10-09 11:05:00',
    Read: false,
  },{
    Sender: 'Emily',
    Receiver: 'John',
    Content: 'Goodbye!',
    Time: '2023-10-09 11:00:00',
    Read: false,
  },
  {
    Sender: 'John',
    Receiver: 'Emily',
    Content: 'Goodbye, Emily!',
    Time: '2023-10-09 11:05:00',
    Read: false,
  },
];

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