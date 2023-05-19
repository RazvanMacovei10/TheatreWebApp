import { EventModel } from "./event";
import { User } from "./user";

export interface Reservation{
    id:number,
    numberOfTickets:number,
    event:EventModel,
    user:User,
}