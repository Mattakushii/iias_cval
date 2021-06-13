import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useAuthContext } from '../../core/auth-provider';
import { Link } from "react-router-dom";
import { ShowMenu } from "../menu/showMenu";
import Modal from 'react-modal';
import "./header.css";

export const Header = () => {
  const authContext = useAuthContext()
  const [studentsData, setStudentsData] = useState([])

  useEffect(() => {
      Axios.get("/api/student", {
        headers: {
          "id": localStorage.getItem("userId")
        }
      }) 
          .then((res) => {
              setStudentsData(res.data)
          })
          .catch((err) => {
              throw new Error(err.message)
          });
  }, []);

  // const checkIsLoggedIn = async () => {
  //   await Axios.get("/api/isAuth", {
  //       headers: {
  //           "x-access-token": localStorage.getItem("token")
  //       },
  //   }).then((response) => {
  //       response.data.isAuth ? setIsLoggedIn(true) : setIsLoggedIn(false)
  //   })
  // }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return(
  <>
    <div className="header-block" >
      <button onClick={ShowMenu} className="navbar-btn" >
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </button>
      <div className="student-info">
        <Link to='/main' className="main-info-link">
          <div className="main-student">
              <img src="img/user-photo.png" alt=""/>
            <div className="main-student-info">
              <div>
                {studentsData && studentsData.map((item, i) => (
                    <div key={i}>
                        <h2>{item.first_name} {item.second_name}</h2>
                        {!item.is_auth ? <p>В сети</p> : <p>Не в сети</p>}
                    </div>
                ))}
              </div>
              <p>Таб. № 1139693</p>
            </div>
          </div>
        </Link>

        <div className="main-week">
          <p className="main-week-number">12 Неделя</p>
          <i>Числитель</i>
        </div>
        
        <div className="main-setting">
          <Link to="/chat">
            <img className="main-settings" src="img/message.svg" alt=""/>
          </Link>
          <button onClick={handleOpen} className="btn">
            <img className="main-settings" src="img/setting.svg" alt=""/>
          </button>
          <button onClick={() => { authContext.logout() }} className="btn">
            <img className="main-settings" src="img/out.svg" alt=""/>
          </button>
        </div>
      </div>
    </div>

    <Modal 
      isOpen={open}
      className={{
        base: 'modal-setting-content', 
        afterOpen: 'modal-setting-content',
        beforeClose: 'modal-setting-content'
      }}
      overlayClassName={{
        base: 'modal-bg', 
        afterOpen: 'modal-bg1',
        beforeClose: 'modal-bg1'
      }}
      onRequestClose = {handleClose}
      ariaHideApp={false}
    >
      <h3 className="modal-setting-title">Настройки</h3>
    </Modal>
  </>
  )
};
