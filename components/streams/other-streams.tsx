import { useContext, useEffect } from "react";

import { PeerId } from "@/common/types";
import { UsersStateContext } from "@/components/contexts/users-settings";
import { UsersConnectionContext } from "@/components/contexts/users-connection";
import { UsersUpdaterContext } from "@/components/contexts/users-settings";

import VideoContainer from "../video-container";

export default function OtherStreams() {
    const {streams, isMuted,avatars, isHidden} = useContext(UsersStateContext)
    const {leaveRoom} = useContext(UsersConnectionContext)
    const {muteUser} = useContext(UsersUpdaterContext)

    useEffect(()=> {
        console.log(streams);
        
    })

    return (
        <>
            {
                Object.entries(streams).map(([id, element]:[PeerId, any])=> {
                    return (
                        <VideoContainer
                            key={id}
                            id={id}
                            muted={isMuted[id]}
                            visible={!isHidden[id]}
                            userPicture={avatars[id]}
                            stream={element.props.stream}
                            onMutePeer={muteUser}
                            onRemovePeer={leaveRoom}
                        >
                                {element}
                        </VideoContainer>
                    )
                })
            }
        </>
    )
}