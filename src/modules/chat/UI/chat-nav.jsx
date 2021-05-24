import React, { useEffect, useState, useContext } from "react";
import Axios from 'axios';
import { ChatList } from 'react-chat-elements'
import { ChatContext } from '../chat-context'

export const ChatNav = () => {
    const [chats, setChats] = useState([])
    const [dialog, setDialog] = useContext(ChatContext)
    useEffect(() => {
        Axios.get("/api/showchats", {headers: {
            "token": localStorage.getItem("token")
            }}).then((res) => {
                setChats(res.data)
            })
    }, [])

    return (
        <ChatList
            className='chat__list'
            dataSource={chats}
            onClick={(e) => setDialog(e.alt)} 
        />
    )
}