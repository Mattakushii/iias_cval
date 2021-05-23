import React from 'react'

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