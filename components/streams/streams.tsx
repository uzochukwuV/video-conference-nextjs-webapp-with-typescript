import { useContext } from "react";

import { UsersStateContext } from "@/components/contexts/users-settings";
import MyStream from "./my-streams";
import OtherStreams from "./other-streams";
import { Nullable } from "@/common/types";

export default function Streams({
    fullscreen,
    sharedScreen,
    stream,
    muted,
    visible
}:StreamsProps) {
    const sharedContext = useContext(UsersStateContext).sharedScreenTrack;
    const shared = sharedScreen  ?? sharedContext;

    return (
        <div
        className={`${
          fullscreen && shared ? 'hidden' : ''
        } flex flex-wrap gap-4 justify-around ${shared ? 'basis-1/6' : ''}`}
      >
        <MyStream stream={stream} muted={muted} visible={visible} />
        <OtherStreams />
      </div>
    )
}

type StreamsProps = {
    fullscreen:boolean,
    sharedScreen:Nullable<MediaStreamTrack>,
    stream:MediaStream,
    muted:boolean,
    visible:boolean,
}