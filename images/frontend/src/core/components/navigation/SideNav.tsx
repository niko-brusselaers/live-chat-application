import style from "./css/SideNav.module.css";
import { ISideNavChats } from "../../shared/interfaces/sideNavChats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear,faRotateRight,faRightFromBracket } from "@fortawesome/free-solid-svg-icons";


function SideNav({userChats}:{userChats:ISideNavChats[]}) {
    return (  
        <div className={style.sideNavContainer} >
            <div className={style.chatsContainer}>
            {(userChats.map((chat, index) => 
            <a  href="#" key={index}>{chat.user} {(chat.newMessages ? <span>{chat.newMessages}</span>: <></>)}
            </a> ))}
            </div>
            <div className={style.sideNavButtonsContainer}>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faRotateRight} /></button>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faGear} /></button>
                <button className={style.sideNavButton}><FontAwesomeIcon icon={faRightFromBracket} /></button>
            </div>
        </div>
    );
}

export default SideNav;