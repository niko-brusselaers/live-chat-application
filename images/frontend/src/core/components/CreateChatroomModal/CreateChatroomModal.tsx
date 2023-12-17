import { useState } from 'react';
import styles from './CreateChatroomModal.module.css';
import { Socket } from 'socket.io-client';
import { IMessage } from '../../shared/interfaces/IMessage';

function CreateChatRoomModal({createChatroomModal,socket,username}: {createChatroomModal:Function, socket:Socket,username:string}) {
    const [inputs, setInputs] = useState<string[]>([""]);

    function handleForm(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(inputs[0] !== ""){
            const users = inputs.filter((input) => input !== "");

            socket.emit('message', {
                chatroomId: "",
                sender: username,
                receiver: users
            });
        }
    }

    function addInput(){
        const updatedInputs = [...inputs];
        updatedInputs.push("");
        setInputs(updatedInputs);
    }

    function handleChange(index:number, value:string){
        const updatedInputs = [...inputs];
        updatedInputs[index] = value;
        setInputs(updatedInputs);
    }

    return ( 
        <div className={styles.modalOverlay}>
            <div className={styles.modalContentContainer}>
                <h1>add users to chatroom</h1>
                <form onSubmit={(event) => {handleForm(event)}}>
                    {inputs.map((input, index) =>
                        <input type="text" name="username" id="username" key={index} onChange={(e) => handleChange(index, e.target.value)} placeholder='please enter name of user'/>
                    )}
                    <button onClick={addInput}>add user</button>
                    <button type="submit">submit</button>
                </form>
                <button className={styles.cancelButton} onClick={() => {createChatroomModal(false)}}>cancel</button>
            </div>
        </div>
     );
}

export default CreateChatRoomModal;