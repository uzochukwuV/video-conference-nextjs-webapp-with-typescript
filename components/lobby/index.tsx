import { useUser } from "@auth0/nextjs-auth0/client";
import {
  UserIcon,
  Bars3Icon,
  VideoCameraIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";

import { useMediaStream } from "@/hooks";
import VideoContainer from "../video-container";
import { PeerVideo } from "..";
import { MY_SELF } from "@/common/constants";
import { Tooltip } from "react-tooltip";

export default function Lobby({
  stream,
  onJoinRoom,
}: {
  stream: MediaStream;
  onJoinRoom: () => void;
}) {
  const user = useUser().user;
  const { muted, visible, toggle, toggleVideo } = useMediaStream(stream);

  return (
    <div className="h-screen w-auto grid grid-cols-2 gap-4 place-content-center place-items-center">
      
      <div className="flex flex-col gap-2">
        <VideoContainer
          id="me"
          muted={muted}
          visible={visible}
          stream={stream}
          userPicture={user?.picture || ""}
        >
          <PeerVideo key={"me"} stream={stream} name={MY_SELF} isMe={true} />
        </VideoContainer>
        <div className="flex justify-end gap-2">
          <button
            onClick={toggleVideo}
            data-for="visibility"
            data-tip={`${!visible ? "switch on" : "switch off"}`}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <VideoCameraIcon className="h-6 w-6" />
            {!visible && ""}
          </button>
          <Tooltip id="visibility" />

          <button
            onClick={() => toggle("audio")(stream)}
            data-for="audio"
            data-tip={`${!visible ? "unmute" : "mute "}`}
            className="p-3 rounded-xl text-white bg-slate-800 hover:bg-indigo-700 relative"
          >
            <MicrophoneIcon className="h-6 w-6" />
            {!visible && ""}
          </button>
          <Tooltip id="visibility" />

          <button
            onClick={onJoinRoom}
            type="button"
            className="p-2 text-sm font-medium rounded-md text-emerald-800 bg-emerald-300 hover:bg-indigo-200"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
