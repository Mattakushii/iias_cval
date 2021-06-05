import React, { useState } from 'react';
import { useAuthContext } from "../../core/auth-provider";
import './style.css';
import OpenModal from './script.js';

export const SignInScreen = () => {
    const [login, setLogin] = useState("Max228");
    const [password, setPassword] = useState("1337");

    const authContext = useAuthContext()

    return (
        <>
            <header>
                <div className="main-bg">
                    <img className="main-logo" src='img/logo.png' alt="Logo" />
                    <button onClick={OpenModal} className="btn main-registration">Регистрация</button>
                    <button onClick={OpenModal} className="btn main-login">Войти</button>
                    <div className="main-title">
                        <h1 className="main-title1">Центр</h1>
                        <h1 className="main-title2">Информационного</h1>
                        <h1 className="main-title3">Обеспечения</h1>
                    </div>
                </div>
                <div className="modal">
                    <div className="modal-bg"></div>
                    <div className="modal-content">
                        <h3 className="modal-title">Здравствуйте!<br />Чтобы войти в систему введите логин и пароль</h3>
                        <form className="modal-form" >
                            <input className="modal-input" type="text" placeholder="Логин" 
                                required
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            ></input>
                            <input className="modal-input" type="password" placeholder="Пароль"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            <button className="modal-btn" onClick={() => authContext.login(login, password)} type="button">
                                Войти
                            </button>
                        </form>
                    </div>
                </div>
            </header>
        </>
    )
}