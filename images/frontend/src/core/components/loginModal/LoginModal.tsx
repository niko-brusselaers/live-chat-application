import { Socket } from 'socket.io-client';
import styles from './LoginModal.module.css';
import { useState } from 'react';

function LoginModal({setUsername, socket}:{setUsername:Function, socket:Socket}) {
    const [tempUsername, setTempUsername] = useState<string | undefined>();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    function handleSubmit(event:React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        console.log(process.env.REACT_APP_BACKEND_URL);
        
        
        if(tempUsername){
            socket.emit('login', tempUsername);
            socket.on('login', (data:{data:string,statuscode:number,userId:string | undefined})=>{
                if(data.statuscode === 200)setUsername(data.userId);
                else setErrorMessage(data.data);
            })
        }
    }

    return ( 
        <div className={styles.modalOverlay}>
            <div className={styles.modalContentContainer}>
                <h1>please enter your username</h1>
                {errorMessage? <p className={styles.errorMessage}>{errorMessage}</p> : null}
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" id="username" onChange={(event) => {setTempUsername(event.currentTarget.value)}}/>
                    <button type="submit">submit</button>
                </form>
            </div>
        </div>
     );
}

export default LoginModal;