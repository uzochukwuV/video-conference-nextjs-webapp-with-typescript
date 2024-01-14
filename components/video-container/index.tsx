import { UsersConnectionContext } from "@/components/contexts/users-connection";
import { UsersStateContext } from "@/components/contexts/users-settings";
import React, { useContext } from "react";

import { ActiveSpeaker, VideoPlug } from "..";
import { MutedIcon } from "@/assets";
import { ChartBarIcon } from "@heroicons/react/24/outline";

const VideoContainer = ({
  id,
  muted,
  visible,
  children,
  stream,
  userPicture,
  onMutePeer,
  onRemovePeer,
}: SingleVideoProps) => {
  const { myId } = useContext(UsersConnectionContext);
  const { isHost } = useContext(UsersStateContext);

  return (
    <div
      key={id}
      className="relative group h-fit drop-shadow-2xl shadow-indigo-500/50"
    >
      {!visible && <VideoPlug userPicture={userPicture} />}

      <div className={`${!visible ? "hidden" : ""}`}>{children}</div>

      {muted ? (
        <div className="absolute top-3 right-3">
          <MutedIcon />
          <ChartBarIcon title="speaker" />
        </div>
      ) : (
        <ActiveSpeaker stream={stream} />
      )}
    </div>
  );
};

type SingleVideoProps = {
  id: string;
  muted: boolean;
  visible: boolean;
  children: React.ReactNode;
  stream: MediaStream;
  userPicture: string;
  onMutePeer?: (id: string) => void;
  onRemovePeer?: (id: string) => void;
};

export default VideoContainer;
