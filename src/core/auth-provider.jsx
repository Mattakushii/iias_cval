import Axios from 'axios'
import React, { useState, useContext } from 'react'

const defaultValues = {
    isLoggedIn: false,
    logout: async () => { },
    login: async () => { },
    checkIsLoggedIn: async () => { }
}

const AuthContext = React.createContext(defaultValues)

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const checkIsLoggedIn = async () => {
        await Axios.get("/api/isAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            },
        }).then((response) => {
            response.data.isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false)
        })
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setIsLoggedIn(false)
        window.location.reload();
    }

    const login = async (login, password) => {
        Axios.post("/api/login", {
            login: login,
            password: password,
        }).then((response) => {
            if (response.data.isAuth) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userId", response.data.id)
                setIsLoggedIn(true)
            }
        });
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, logout, login, checkIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
