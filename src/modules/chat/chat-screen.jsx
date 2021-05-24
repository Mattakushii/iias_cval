import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import socket from "../../core/socket";
import { ChatNav } from "./UI/chat-nav";
import { ChatDisplay } from "./UI/chat-display";
import { ChatContext } from "./chat-context";
import { Input } from "react-chat-elements";
import { Button } from 'react-chat-elements'

export const ChatScreen = () => {
  const [dialog, setDialog] = useState(0);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      <h1>Chat</h1>
      <div className="chat__wrapper">
        <ChatContext.Provider value={[dialog, setDialog]}>
          <ChatNav />
          <ChatDisplay />
        </ChatContext.Provider>
      </div>
      <Input
        placeholder="Type here..."
        multiline={true}
        rightButtons={
          <Button color="white" backgroundColor="black" text="Send" />
        }
      />
    </>
  );
};
