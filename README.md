This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Nextjs Video conference app build tasks

1. socket api 
create a response type concatenation with {socket, server , io} : 
{NetSocket, HttpServer, socket.io server}

create socket server and set {path}
set io = server created

2. _app
initialised socket in app anmd create context for it

3. set Oauth params in .env.local and initialise in api/auth/[...authO].ts

4. /index.tsx
create room and join room logic
A. 
#    i. create room route room/[id]
#    ii. create id using nanoid`s customAlphabet to generate random letters` in utils/ 
#    iii. set user as host in localstorage
#    iv. route user to room/[id]

5. room/[id]

try media stream
~~~ MEDIASTREAM
## params are statuses, stream, muted and visible, toggle video or audio

if stream, setStatus"idle" , getTracks and set muted and visible values
else getUsermedia, and setstatus sucess

toggle video or audio functions

<!-- lobby for waiting and room for video -->
6. Lobby 

Video of me, button to toggle video and audio and one to join the room

Video of me
Video container and PeerVideo

Video container holds
1. user image if no video stream
2. muted icon or active speaker using audio analyser and audio context
3. host control panel
4. children

Peer Video holds
video element and name

Others 
muted Icon and Video Icon and join room button

Room  and stream

Shared screen streams
Streams 
Control panel and 
chat modal

forehand
~~~~~ create userContextsettings for keeping states of all users streams and state
~~~~~ 


