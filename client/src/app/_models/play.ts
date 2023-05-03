import { PlayType } from "./play-type";

export interface Play{
    id:number,
    name:string,
    description:string,
    image:string,
    type:PlayType
}