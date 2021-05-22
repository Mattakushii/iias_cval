import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import Login from "./Login/Login";

const App = () => {
  const [students, setStudents] = useState([]);
  const [userAuth, setUserAuth] = useState([]);

  useEffect(() => {
    Axios.get("/api/students")
      .then((res) => {
        setStudents(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    Axios.get("/api/isAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(userAuth);
      setUserAuth(response.data.isAuth);
    });
  }, []);

  return (
    <>
      {userAuth ? (
        <div>
          {students.map((student, index) => (
            <article key={index}>
              <h2>{student.first_name + " " + student.second_name}</h2>
              {student.is_auth ? <p>В сети</p> : <p>Не в сети</p>}
            </article>
          ))}
        </div>
      ) : null}

      <Login />
    </>
  );
};

export default App;
