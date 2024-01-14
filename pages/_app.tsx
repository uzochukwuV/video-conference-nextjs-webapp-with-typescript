import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext } from "react";
import { io } from "socket.io-client";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const socket = io("/", { path: "/api/socketio" });
export const SocketContext = createContext(socket);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SocketContext.Provider value={socket}>
        <Component {...pageProps} />
      </SocketContext.Provider>
    </UserProvider>
  );
}
/* created  UserProvider from auth0 

    created a socketContext to save socket data and added the provider
    
    requested from the socketio api to start server
 */
