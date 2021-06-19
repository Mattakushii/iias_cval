import React, { useState } from 'react';
import { useAuthContext } from "../../core/auth-provider";
import Modal from 'react-modal';

export const SignInScreen = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const authContext = useAuthContext()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <main>
                <div className="main-bg">
                    <img className="main-logo" src='img/logo.png' alt="Logo" />
                    <button onClick={handleOpen} className="btn main-registration">Регистрация</button>
                    <button onClick={handleOpen} className="btn main-login">Войти</button>
                    <div className="main-title">
                        <h1 className="main-title1">Центр</h1>
                        <h1 className="main-title2">Информационного</h1>
                        <h1 className="main-title3">Обеспечения</h1>
                    </div>
                </div>

                <Modal
                    isOpen={open}
                    className={{
                        base: 'modal-content',
                        afterOpen: 'modal-content',
                        beforeClose: 'modal-content'
                    }}
                    overlayClassName={{
                        base: 'modal-bg',
                        afterOpen: 'modal-bg',
                        beforeClose: 'modal-bg'
                    }}
                    onRequestClose={handleClose}
                    ariaHideApp={false}
                >
                    <h3 className="modal-title">Здравствуйте!<br />Чтобы войти в систему введите логин и пароль</h3>
                    <form className="modal-form">
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
                </Modal>

            </main>
        </>
    )
}
