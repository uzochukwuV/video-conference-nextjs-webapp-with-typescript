import { useContext, useEffect, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useMediaStream } from ".";
import { SocketContext } from "@/pages/_app";
import { useRouter } from "next/router";
import Peer from "peerjs";

import { RoomId, PeerId, Nullable } from "@/common/types";
import { error } from "@/common/utils";

/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */

const usePeer = (stream: MediaStream) => {
  const socket = useContext(SocketContext);
  const room = useRouter().query.roomId as RoomId;
  const user = useUser().user!;

  const { muted, visible } = useMediaStream(stream);
  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<PeerId>("");

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      console.log("making Peer now ......");

      try {
        const peer = new (await import("peerjs")).default();
        setPeer(peer);
        setIsLoading(false);

        peer.on("open", (id) => {
          console.log("your device id:", id);
          // setMyId(id);
          console.log("emitting user join");
          socket.connect()
          
          socket.emit("room:join", {
            room,
            user: {
              id,
              muted,
              visible,
              name: user?.name || "greek",
              picture: user?.picture || "",
            },
          });
          setMyId(id);
        });
        
        peer.on("error", error("Failed to setup Peer connection"));
      } catch (e) {
        error("Unable to create Peer")(e);
      }
    })();
    
  }, []);
  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};

export default usePeer;
