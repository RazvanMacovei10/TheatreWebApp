import { Play } from "./play";

export interface EventModel{
    id:number,
    datetime:Date,
    availableTickets:number,
    location:string,
    city:string,
    price:number,
    active:boolean,
    theatreName:string,
    play:Play
}