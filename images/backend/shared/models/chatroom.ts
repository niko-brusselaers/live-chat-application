import { IMessage } from './message';

export interface IChatroom{
    id:number,
    name:string | undefined,
    users:string[],
    messages:IMessage[]
}
