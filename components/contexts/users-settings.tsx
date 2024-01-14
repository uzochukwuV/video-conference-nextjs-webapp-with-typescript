import { useContext, createContext, useEffect, useState } from "react";

import { useRouter } from "next/router";

import { Nullable, PeerId, KeyValue, RoomId } from "@/common/types";
import { SocketContext } from "@/pages/_app";

import { append, isHost } from "@/common/utils";
// isHost checks localstorage for host roomId
//append , concats or adds users to room state

export const UsersUpdaterContext = createContext<any>({});
// holds functions to update users state
export const UsersStateContext = createContext<any>({});
// holds all the users state

export default function UsersSettingsProvider({ children }: any) {
  const router = useRouter();
  const socket = useContext(SocketContext);

  const [streams, setStreams] = useState<Record<PeerId, JSX.Element>>({});
  // streams holds users peerId and their video streams
  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  // holds users and muted value
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  //holds users and hidden or video show value
  const [avatars, setAvatars] = useState<KeyValue<string>>({});
  // holds users avatar
  const [names, setNames] = useState<KeyValue<string>>({});
  // holds user names

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);
  // dont know yet

  useEffect(() => {
    socket.on("user:toggled-video", (peerId: PeerId) => {
      setIsHidden(append({ [peerId]: !isHidden[peerId] }));
      // type is paased down from setIsHidden to append
      // it returns  record<string, T> | T[]
    });
  }, [isHidden]);
  // listens for when user toggles video showing

  useEffect(() => {
    socket.on("user:toggled-audio", (peerId: PeerId) =>
      setIsMuted(append({ [peerId]: !isMuted[peerId] }))
    );
  }, [isMuted]);

  return (
    <UsersStateContext.Provider
      value={{
        streams,
        isHidden,
        isHost: isHost(router.query.roomId as RoomId),
        isMuted,
        avatars,
        names,
        sharedScreenTrack
      }}
    >
        <UsersUpdaterContext.Provider value={{
            setAvatars,
            setIsHidden,
            setIsMuted,
            setNames,
            setSharedScreenTrack,
            setStreams,
            muteUser : (id:PeerId)=> socket.emit('host:mute-user', id),
        }}>
            {children}
        </UsersUpdaterContext.Provider>
    </UsersStateContext.Provider>
  );
}
