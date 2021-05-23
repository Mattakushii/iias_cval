import React, { useState } from 'react'

import { useAuthContext } from "../../core/auth-provider"

export const SignInScreen = () => {
    const [login, setLogin] = useState("Max228");
    const [password, setPassword] = useState("1337");

    const authContext = useAuthContext()

    return (
        <>
            <label className="login-form__label">Логин</label>
            <input
                className="login-form__input"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            ></input>
            <label className="login-form__label">Пароль</label>
            <input
                className="login-form__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
            ></input>
            <button onClick={() => authContext.login(login, password)} type="button">
                Войти
            </button>
        </>
    )
}