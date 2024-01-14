import { useContext } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

import { UsersConnectionContext } from '@/components/contexts/users-connection';
import VideoContainer from '../video-container';

import { PeerVideo } from '..';
import { MY_SELF } from '@/common/constants';


export default  function MyStream({stream, muted, visible}:{
    stream: MediaStream,
    muted: boolean,
    visible: boolean
}) {
    const avatar = useUser().user?.picture || '';
    const {myId} = useContext(UsersConnectionContext)

    return (
        <VideoContainer
         id={myId}
         muted={muted}
         visible={visible}
         stream={stream}
         userPicture={avatar}
         >
            <PeerVideo stream={stream} name={MY_SELF} isMe={true}></PeerVideo>
        </VideoContainer>
    )
}