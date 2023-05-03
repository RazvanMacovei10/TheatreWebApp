import { Play } from "./play";

export interface Event{
    id:number,
    datetime:Date,
    availableSeats:number,
    theatreName:string,
    play:Play
}