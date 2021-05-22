import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../core/auth-provider'
import { MainRouter } from './main-router'
import { SignInRouter } from './sign-in-router'


export const Root = () => {
    const [isLoading, setIsLoading] = useState(true)
    const authContext = useAuthContext()

    useEffect(() => {
        const check = async () => {
            await authContext.checkIsLoggedIn().then(() => { setIsLoading(false) })
        }
        check()
    }, [])

    return !isLoading ? !authContext.isLoggedIn ? <SignInRouter /> : <MainRouter /> : <></>
}