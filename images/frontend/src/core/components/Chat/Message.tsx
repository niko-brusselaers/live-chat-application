import { IMessage } from "../../shared/interfaces/message";

function Message({message}:{message:IMessage}) {
    const currentUser = 'John';
    

    return ( 
        (message.Sender === currentUser) ?
        <div className="w-75 align-self-end bg-info">
            <p className="w-100 h-25  text-white text-center">
                {message.Sender}
            </p>
            <p className="w-100 h-25  text-white text-center">
                {message.Content}
            </p>
        </div>
        :
        <div className="w-75 align-self-start bg-secondary">
            <p className="w-100 h-25  text-white text-center">
                {message.Sender}
            </p>
            <p className="w-100 h-25  text-white text-center">
                {message.Content}
            </p>
        </div>
    );
}

export default Message;