import { IMessage } from "./IMessage";

export interface IChatroom{
    id:number,
    name:string | undefined,
    users:string[],
    messages:IMessage[],
    newMessages:number,
}
