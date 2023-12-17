import style from "./css/SideNav.module.css";
import { ISideNavChats } from "../../shared/interfaces/sideNavChats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faRotateRight,faRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";
import { IChatroom } from "../../shared/interfaces/IChatroom";


function SideNav({chatrooms, createChatroom}:{chatrooms:IChatroom[], createChatroom:Function}) {
    return (  
        <div className={style.sideNavContainer} >
            <div className={style.chatsContainer}>
            {chatrooms ? (chatrooms.map((chatroom, index) => 
            <a  href="#" key={index}>{chatroom.users.map((user, index) => {
                if(index === chatroom.users.length-1) return user 
                else return user+', '})} {(chatroom.newMessages ? <span>{chatroom.newMessages}</span>: <></>)}
            </a> )) : null}
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