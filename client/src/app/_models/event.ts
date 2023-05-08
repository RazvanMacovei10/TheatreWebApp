import { Play } from "./play";

export interface EventModel{
    id:number,
    datetime:Date,
    availableSeats:number,
    theatreName:string,
    play:Play
}