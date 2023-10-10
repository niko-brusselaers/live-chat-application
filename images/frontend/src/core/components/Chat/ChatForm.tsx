import { Button, Form } from "react-bootstrap";

function ChatForm() {
    return ( 
        <Form className="pt-5 d-flex flex-row" >
            <Form.Control type="text" placeholder="Type a message" />
            <Button type="submit">Submit</Button>
        </Form>
     );
}

export default ChatForm;