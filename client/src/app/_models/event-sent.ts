import { Play } from "./play";

export interface EventSent{
    id:number,
    theatreName:string,
    playId:number,
    location:string,
    city:string,
    price:number,
    availableTickets:number,
    datetime:Date
}