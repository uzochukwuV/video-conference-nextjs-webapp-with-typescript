import { MediaConnection } from "peerjs";
import { UsersStateContext } from "@/components/contexts/users-settings";
import { useContext } from "react";
import { UsersConnectionContext } from "@/components/contexts/users-connection";
import { ArrowsUpDownIcon, MicrophoneIcon, VideoCameraIcon } from "@heroicons/react/20/solid";
import { Kind } from "@/common/types";
import { Tooltip } from "react-tooltip";
import {UserMinusIcon as HangUpIcon} from "@heroicons/react/20/solid";
import CrossLineDiv from "@/common/components/cross-div";
import { ArrowUpCircleIcon as ShareScreenIcon, ChatBubbleLeftIcon as ChatIcon } from "@heroicons/react/16/solid";
const ControlPanel = ({
  muted,
  visible,
  chat,
  screenTrack,
  onLeave,
  onToggle,
}: ControlPanelProps) => {
  const { sharedScreenTrack: shared, streams } = useContext(UsersStateContext);
  const { users } = useContext(UsersConnectionContext);

  return (
    <>
      {(screenTrack || shared) && (
        <>
          <button
            onClick={() => onToggle("fullscreen")}
            className={`${common} bg-slate-800 hover:bg-emerald-700`}
          >
            <ArrowsUpDownIcon />
          </button>
        </>
      )}
      <div className="flex flex-auto gap-6 place-content-center items-center">
        <button
          onClick={() => onToggle("video", Object.values(users))}
          data-for="visibility"
          data-tip={`${!visible ? "switch on" : "switch off"}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          {!visible && <CrossLineDiv />}
        </button>
        <Tooltip id="visibility" />

        <button
          onClick={() => onToggle('audio')}
          data-for="audio"
          data-tip={`${muted ? 'unmute' : 'mute'}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <MicrophoneIcon className="h-6 w-6" />
          {muted && <CrossLineDiv />}
        </button>
        <Tooltip id="audio"/>

        <button
          onClick={onLeave}
          data-for="hangUp"
          data-tip="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <HangUpIcon className="h-7 w-7" />
        </button>
        <Tooltip id="hangUp"  />

        <button
          onClick={() => onToggle('screen')}
          disabled={shared}
          className={`${common} ${
            screenTrack || shared
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
          data-for="shareScreen"
          data-tip="share your screen"
        >
          <ShareScreenIcon className="h-6 w-6" />
        </button>
        <Tooltip id="shareScreen"  />

        <button
          data-for="chat"
          data-tip="chat with everyone"
          onClick={() => onToggle('chat')}
          className={`${common} ${
            chat
              ? 'bg-emerald-600 hover:bg-emerald-500'
              : 'bg-slate-800 hover:bg-emerald-700'
          }`}
        >
          <ChatIcon className="w-6 h-6" />
        </button>
        <Tooltip id="chat"  />

      </div>
    </>
  );
};

type ControlPanelProps = {
  muted: boolean;
  visible: boolean;
  chat: boolean;
  screenTrack: boolean;
  onToggle: (kind: Kind, users?: MediaConnection[]) => Promise<void>;
  onLeave: () => void;
};

const common = "p-3 rounded-xl text-white";

export default ControlPanel;