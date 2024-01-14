import { createContext, useState } from "react";
import { NextPage, GetServerSidePropsContext, PreviewData } from "next";
import Room from '@/app/index'
import { useMediaStream } from "@/hooks";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Lobby } from "@/components";



const Page:NextPage = ()=> {
    const [isLobby,setIsLobby]= useState(true);
    const {stream, isLoading} = useMediaStream()
    // this creates the media stream with navigator.getmedia


    if(isLoading) return 'loading';
    if(!stream) return <>No stream</>;

    if (isLobby) return <Lobby stream={stream} onJoinRoom={()=>setIsLobby(false)} />
    return <>
        <Room stream={stream} />
    </>
}

export default Page;


// export const getServerSideProps = async(
//     ctx: GetServerSidePropsContext<any, PreviewData>
// )=> await withPageAuthRequired({
//     returnTo: '/room/' + ctx.query.roomId
// })