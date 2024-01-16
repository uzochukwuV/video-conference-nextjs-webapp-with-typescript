import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UsersSettingsProvider from "@/components/contexts/users-settings";
import UsersConnectionProvider from "@/components/contexts/users-connection";
import { SocketContext } from "@/pages/_app";
import { useMediaStream } from "@/hooks";
import usePeer from "@/hooks/use-peer";
import useScreen from "@/hooks/use-screen";
import { MediaConnection } from "peerjs";
import { SharedScreenStream, Streams } from "@/components/streams";
import { ControlPanel } from "@/components/control-panel";
import { Kind, PeerId } from "@/common/types";
import Modal from "@/common/components/modal";
import Chat from "@/components/chat/chat";


export default function App({ stream }: { stream: MediaStream }) {
  const router = useRouter();
  const socket = useContext(SocketContext);
  //socket emit and listen to events

  const { muted, visible, toggleVideo, toggle } = useMediaStream(stream);
  // media stream
  const { peer, myId, isPeerReady } = usePeer(stream);
  // creates Peer and emits user : join room
  const { startShare, stopShare, screenTrack } = useScreen(stream);

  const [modal, setModal] = useState<"hidden" | "chat" | "status" | "close">(
    "hidden"
  );

  const [fullscreen, setFullscreen] = useState(false);

  async function toggleKind(kind:Kind, users?: MediaConnection[]) {
    switch (kind) {
        case 'audio':{
            toggle('audio')(stream);
            socket.emit('user:toggle-audio', myId)
            return;
        }
        case 'video':{
            toggleVideo((newVideoTrack:MediaStreamTrack)=> 
            users!.forEach(replaceTrack(newVideoTrack)));
            socket.emit('user:toggle-video', myId);
            return;
        }
        
        case "screen": {
            if(screenTrack){
                stopShare(screenTrack)
                socket.emit('user:stop-share-screen');
                setFullscreen(false);
                // toast('Stopped presenting screen')
            }else{
                await startShare(
                    ()=>{
                        socket.emit('user:share-screen');
                        // toast('Starting presenting screen');
                    },
                    ()=>socket.emit('user:stop-share-screen')
                )
            }
        }
        case "fullscreen": {
            setFullscreen(!fullscreen);
            return;
        }
        case "chat":{
            modal== 'chat' ? setModal('close') : setModal('chat');
            return;
        }
        case "users":{
            modal == 'status' ? setModal('close') : setModal('status')
        }
    
        default:
            break;
    }
  }

  function replaceTrack(track: MediaStreamTrack) {
    return (peer: MediaConnection) => {
      const sender = peer.peerConnection
        ?.getSenders()
        .find((s) => s.track?.kind === track.kind);

      sender?.replaceTrack(track);
    };
  }
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);


  useEffect(() => {
    socket.on('host:muted-user', (peerId:PeerId)=>{
        if(myId == peerId){
            toggleKind('audio');
            // toast('you are muted by host');
        }else{
            // toast('host muted user')
        }
    })
  
    return () => {
      socket.off('host:muted-user')
    }
  }, [myId, socket, toggleKind])

  if (!isPeerReady) return ''
  if (!peer) return ''
  
  return (
    <div className="flex">
      <UsersSettingsProvider>
        <div className="hidden sm:flex flex-col p-4 w-full h-screen ">
          <UsersConnectionProvider stream={stream} myId={myId} peer={peer}>
          <div className="flex h-full place-items-center place-content-center gap-4">
            <SharedScreenStream sharedScreen={screenTrack} fullscreen={fullscreen} />
            <Streams
              stream={stream}
              muted={muted}
              visible={visible}
              sharedScreen={screenTrack}
              fullscreen={fullscreen}
            />
            </div>

            <div className="flex items-center">
            <ControlPanel
              visible={visible}
              muted={muted}
              screenTrack={Boolean(screenTrack)}
              chat={modal == "chat"}
              onToggle={toggleKind}
              onLeave={() => router.push("/")}
            />
            </div>
          </UsersConnectionProvider>
        </div>
        <Modal
          title={
            modal === 'chat'
              ? 'Meeting Chat'
              : modal === 'status'
              ? 'People'
              : ''
          }
          modal={modal}
          onClose={() => setModal('hidden')}
        >
          <div className={modal !== 'chat' ? 'hidden' : ''}>
            <Chat />
          </div>
          <div className={modal !== 'status' ? 'hidden' : ''}>
            {/* <Status muted={muted} visible={visible} /> */}
          </div>
        </Modal>

      </UsersSettingsProvider>
    </div>
  );
}
