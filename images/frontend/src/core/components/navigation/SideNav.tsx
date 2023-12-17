import style from "./css/SideNav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faRotateRight,faRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IChatroom } from "../../shared/interfaces/IChatroom";


function SideNav({chatrooms, createChatroom, changeFocusedChat}:{chatrooms:IChatroom[], createChatroom:Function, changeFocusedChat:Function}) {

    function handleClick(id:number){
        changeFocusedChat(id);
    }


    return (  
        <div className={style.sideNavContainer} >
            <div className={style.chatsContainer}>
            {chatrooms ? (chatrooms.map((chatroom, index) => 
            <button  onClick={() => {handleClick(chatroom.id)}} key={index}>{chatroom.users.map((user, index) => {
                if(index === chatroom.users.length-1) return user 
                else return user+', '})} {(chatroom.newMessages ? <span>{chatroom.newMessages}</span>: <></>)}
            </button> )) : null}
            </div>
            <div className={style.sideNavButtonsContainer}>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faRotateRight} /></button>
                <button className={style.sideNavButton} onClick={() => {createChatroom(true)}}><FontAwesomeIcon icon={faPlus} /></button>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faGear} /></button>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faRightFromBracket} /></button>
            </div>
        </div>
    );
}

export default SideNav;