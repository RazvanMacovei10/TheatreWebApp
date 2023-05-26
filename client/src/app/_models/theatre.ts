import { Address } from "./address";
import { EventModel } from "./event";
import { User } from "./user";

export interface Theatre{
    address:Address;
    user:User;
    name:string;
    totalSeats:number;
    image:string;
    events:EventModel[];
}