import { Play } from "./play";

export interface EventModel{
    id:number,
    datetime:Date,
    availableTickets:number,
    location:string,
    city:string,
    price:number,
    theatreName:string,
    play:Play
}