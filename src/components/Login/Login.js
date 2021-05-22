import React, { useEffect, useState } from "react";
import Axios from "axios";

const Login = () => {
  const [login, setLogin] = useState("ya");
  const [password, setPassword] = useState("1234");
  const [userAuth, setUserAuth] = useState(false)
  const [loginApprove, setLoginApprove] = useState(false);
  const [loginProcess, setLoginProcess] = useState(false);

  useEffect(() => {
    Axios.get("/api/isAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      },
    }).then((response) => {
      console.log(userAuth)
      setUserAuth(response.data.isAuth);
    })
  })

  const loginRequest = () => {
    Axios.post("/api/login", {
      login: login,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.isAuth) {
        localStorage.setItem("token", response.data.token);
        setLoginProcess(false);
        window.location.reload();
      } else {
        setLoginProcess(true);
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <>
      {userAuth ? (
        <button onClick={logout}>Выйти</button>
      ) : (
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
          <button onClick={loginRequest} type="button">
            Войти
          </button>
          {loginProcess ? <h3>Ошибка</h3> : null}
        </>
      )}

      {loginApprove ? <h1>Логин прошел</h1> : null}
    </>
  );
};

export default Login;
