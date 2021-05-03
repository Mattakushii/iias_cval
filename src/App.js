import React, {useState, useEffect} from "react"
import Axios from "axios"
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    Axios.get("/api/students")
      .then((res) => {
        setStudents(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {students.map((student, index) => (
        <article key={index}>
          <h2>{student.first_name + " " + student.second_name}</h2>
          {student.is_auth ? <p>В сети</p> : <p>Не в сети</p>}
        </article>
      ))}
    </div>
  );
}

export default App;
