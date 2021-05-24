import React, { useEffect, useState, useContext } from "react";
import socket from "../../../core/socket";
import "react-chat-elements/dist/main.css";
import { MessageList } from "react-chat-elements";
import ReactMarkdown from "react-markdown";
import { ChatContext } from "../chat-context";


export const ChatDisplay = () => {
  const [dialog] = useContext(ChatContext);
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    socket.emit("showmessage", dialog);
  })

  useEffect(() => {
    socket.on("showmessage", (data) => {
      data.forEach((element) => {
        element.text = element.text;
      });
      setMessagesList(data);
    });
  })

  return (
    <>
      <MessageList
        className="chat__display"
        lockable={true}
        toBottomHei
        ght={"100%"}
        dataSource={messagesList}
      />
    </>
  );
};
