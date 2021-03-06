import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { SignInScreen } from '../modules/sign-in/sign-in-screen'

export const SignInRouter = () => (
    <div>
        <Redirect to="/login" />

        <Switch>
            <Route path="/login" component={SignInScreen} />
        </Switch>
    </div>
)
