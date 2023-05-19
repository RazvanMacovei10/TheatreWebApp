import { EventModel } from "./event";
import { User } from "./user";

export interface ReservationDisplayed{
    id:number,
    numberOfTickets:number,
    date:Date,
    event:string,
    eventDate:Date,
    user:User,
}