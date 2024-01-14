import { Socket as NetSocket } from "net";
import { Server as HTTPServer } from "http";
import { NextApiResponse } from "next/types";
import { Server as SocketIOServer } from "socket.io";
// import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { Socket as ClientSocket } from "socket.io-client";
import Peer, {MediaConnection} from "peerjs";



export type NextApiResponseServerIO = NextApiResponse & {
    socket : NetSocket & {
        server : HTTPServer & {
            io : SocketIOServer;
        }
    }
}

export type TSocket = ClientSocket;


export type KeyValue<T> = Record<string, T>;

export type Nullable<T> = T | null;

export type RoomId = string;
export type PeerId = string;

export type Status = 'loading' | 'idle' | 'rejected' | 'success';
export type Kind = 
| 'audio'
| 'video'
| 'chat'
| 'users'
| 'screen'
| 'fullscreen';


export type UserMessage = {
    user: string;
    text: string;
    time: string;
    shouldAggregate: boolean;
};
