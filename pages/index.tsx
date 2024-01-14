import { ROOM_NAME } from "@/common/constants";
import { createHost, createRoomId } from "@/common/utils";
import Header from "@/components/header";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "./_app";
import { WelcomeContainer } from "@/components";
 
const Home: NextPage = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  

  


  function createRoom(){
    const roomId = createRoomId();
    // created room id using nanoid and customAlphabet
    createHost(roomId);
    // make user the host
    // this sets the room id to localstorage of host cli window
    // to ensure that he is the host
    router.push(`/${ROOM_NAME}/${roomId}`)
  }


  function joinRoom() {
    router.push(`/${ROOM_NAME}/${roomId}`);
  }

  

  return <>
  <Header />
  <WelcomeContainer>
  {/* button to create Room */}
    <button
      onClick={() => { createRoom()}}
      className="p-3 bg-emerald-300 hover:bg-indigo-200 rounded-md text-emerald-800 text-sm founded-medium"
    >
      Create Room
    </button>

    <input
      onChange={(e: any) => setRoomId(e.target.value)}
      placeholder="Enter or paste room id"
      className="px-4 py-1 w-80 rounded-md"
    />
    {/* Input to paste room id to join */}

    <button
      onClick={joinRoom}
      disabled={roomId.length == 0}
      className="p-3 bg-emerald-500 hover:bg-indigo-300 rounded-md text-emerald-800 text-sm founded-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      Join
    </button>
    {/* Button to join the room chat */}
    
    </WelcomeContainer>
  </>
}

export default Home;