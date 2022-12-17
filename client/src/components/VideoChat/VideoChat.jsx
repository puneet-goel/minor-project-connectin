import React, { useState, useContext } from 'react';
import NavBar from '../NavBar/NavBar';
import { ContextProvider } from './Context';
import { Button, TextField } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from './Context.js';
import './Home.css';

const Header = () => {
  const { me, callAccepted, answerCall, call, callEnded, leaveCall, callUser } =
    useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const flag = callAccepted && !callEnded;

  return (
    <div className="container">
      <h4>Video Chat</h4>
      <TextField
        label="ID to call"
        value={idToCall}
        onChange={(e) => setIdToCall(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        color={flag ? 'secondary' : 'primary'}
        fullWidth
        onClick={flag ? leaveCall : () => callUser(idToCall)}
        className="margin"
      >
        {flag ? 'Hang Up' : 'Call'}
      </Button>
      <CopyToClipboard text={me} className="margin">
        <Button variant="contained" color="primary" fullWidth>
          Copy Your ID
        </Button>
      </CopyToClipboard>
      {call.isReceivingCall && !callAccepted && (
        <div className="notifier">
          <h5>{call.name} is calling:</h5>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </div>
  );
};

const Player = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  const flag = callAccepted && !callEnded;

  return (
    <div className="player-chat">
      {stream && (
        <div className="video-container">
          <h5>{name}</h5>
          <video playsInline muted ref={myVideo} autoPlay />
        </div>
      )}
      {flag && (
        <div className="video-container">
          <h5>{call.name || 'Name'}</h5>
          <video playsInline ref={userVideo} autoPlay />
        </div>
      )}
    </div>
  );
};

const VideoChat = () => {
  return (
    <>
      <NavBar disableSearch={true} />
      <div className="video-chat">
        <ContextProvider>
          <Header />
          <Player />
        </ContextProvider>
      </div>
    </>
  );
};

export default VideoChat;
