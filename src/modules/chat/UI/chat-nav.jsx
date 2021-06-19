import React, { useEffect, useState, useContext } from "react";
import { ChatList } from 'react-chat-elements'
import { ChatContext } from '../chat-context'
import socket from "../../../core/socket";

export const ChatNav = () => {
    const [chats, setChats] = useState([])
    const [dialog, setDialog] = useContext(ChatContext)

    useEffect(() => {
        const token = localStorage.getItem("token")
        socket.emit('show_chats', ({token}))
        socket.on('show_chats', (data) => {
            setChats(data)
        })
        return () => {
            socket.off('show_chats')
        }
    }, [dialog])

    return (
        <ChatList
            // className='chat__list'
            dataSource={chats}
            onClick={(e) => setDialog(e.alt)}
        />
    )
}