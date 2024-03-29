import React from "react";
import useIsAudioActive from "@/hooks/use-is-audio-active";
import SpeakerIcon from "@/assets/speaker";
import { SpeakerWaveIcon } from "@heroicons/react/20/solid";

const ActiveSpeaker =({stream}:{stream:MediaStream})=>{
    return useIsAudioActive({source:stream})? (
        <div className="rounded-full bg-indigo-400 absolute top-3 right-3 p-1">
            <SpeakerWaveIcon />
        </div>
    ):null
}

export default ActiveSpeaker;