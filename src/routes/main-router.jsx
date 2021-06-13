import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
// import { NavLink } from 'react-router-dom'
import { ChatScreen } from '../modules/chat/chat-screen'
import { MainScreen } from '../modules/main/main-screen'

export const MainRouter = () => (
    <>
        <Redirect to="/main" />

        {/* <NavLink activeClassName="selected" to="/main">Main</NavLink>
        <NavLink activeClassName="selected" to="/chat">Chat</NavLink> */}

        <Switch>
            <Route exact path="/main" component={MainScreen} />
            <Route exact path="/chat" component={ChatScreen} />
        </Switch>
    </>
)