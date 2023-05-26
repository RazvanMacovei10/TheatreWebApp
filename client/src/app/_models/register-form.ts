import { Address } from "./address";

export interface RegisterForm{
    id:number,
    username:string,
    address:Address,
    name:string,
    totalSeats:string,
    password:string,
    email:string,
    image:string
}