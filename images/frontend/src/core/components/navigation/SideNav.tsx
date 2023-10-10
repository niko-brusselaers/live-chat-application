import { Badge, ListGroup } from "react-bootstrap";
import { ISideNavChats } from "../../shared/interfaces/sideNavChats";

function SideNav({userChats}:{userChats:ISideNavChats[]}) {
    return (  
        <ListGroup className="w-25 h-100 p-3" >
            {(userChats.map((chat, index) => 
            <ListGroup.Item action href="#" className=" w-50 mb-3 bg-dark text-white text-center"
            key={index}>{chat.user} {(chat.newMessages ? <Badge>{chat.newMessages}</Badge>: <></>)}
            </ListGroup.Item> ))}
        </ListGroup>
    );
}

export default SideNav;