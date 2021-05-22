import React, { useEffect, useState } from 'react'
import Axios from 'axios';

import { useAuthContext } from '../../core/auth-provider'

export const MainScreen = () => {
    const authContext = useAuthContext()
    const [studentsData, setStudentsData] = useState([])

    useEffect(() => {
        Axios.get("/api/students")
            .then((res) => {
                setStudentsData(res.data)
            })
            .catch((err) => {
                throw new Error(err.message)
            });
    }, []);

    return (
        <div>
            <h1>MainScreen</h1>
            {studentsData && studentsData.map((item, i) => (
                <div key={i}>
                    <h2>{item.first_name} {item.second_name}</h2>
                    {!item.is_auth ? <p>В сети</p> : <p>Не в сети</p>}
                </div>
            ))}
            <button onClick={() => { authContext.logout() }}>logout</button>
        </div>
    )
}