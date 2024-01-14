import { customAlphabet } from "nanoid";
import { KeyValue, RoomId } from "../types";

export const createRoomId = ():RoomId => {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvxyz', 10);
  return nanoid()
};

export function isHost(roomId: RoomId): boolean {
  return typeof window !== "undefined" && !!window.localStorage.getItem(roomId);
}

export function append<T>(apppendant: any) {
  return (target: KeyValue<T> | T[]) => {
    if (target instanceof Array) return target.concat(apppendant);
    return { ...target, ...apppendant };
  };
}
// target is the prevState


export const createHost = (roomId:RoomId):void =>{
  window.localStorage.setItem(roomId, '*')
}


export function error(message:string) {
  return (error:any)=> {
    console.error(message);
    console.error(error);
    
    
  }
}

export function formatTimeHHMM(milliseconds:number){
  return new Date(milliseconds).toLocaleTimeString(undefined, {
    hour:'2-digit',
    minute: '2-digit',
    hour12: false,
  })
}