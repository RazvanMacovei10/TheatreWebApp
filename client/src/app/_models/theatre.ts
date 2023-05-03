import { Address } from "./address";
import { Event } from "./event";
import { User } from "./user";

export interface Theatre{
    address:Address;
    user:User;
    totalSeats:number;
    image:string;
    events:Event[];
}