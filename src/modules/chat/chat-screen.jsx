import React from 'react'
import io from 'socket.io-client'

const SOCKET_ADDRESS = "http://localhost:3001"
const socket = io(SOCKET_ADDRESS);

export const ChatScreen = () => {
    return (
        <>
            <h1>Chat</h1>
            <section className="chat">
                <div className="chat__display"></div>
                <textarea className="chat__input"></textarea>
            </section>
        </>
    )
}