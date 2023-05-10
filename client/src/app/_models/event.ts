import { Play } from "./play";

export interface EventModel{
    id:number,
    datetime:Date,
    availableSeats:number,
    price:number,
    theatreName:string,
    play:Play
}