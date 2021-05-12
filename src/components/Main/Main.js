import React from "react";
import { Link } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';

import { AddTask, DeleteTask, ShowTask, HideTask } from './task';
import Menu from "../Menu/Menu";
import { ShowMenu } from "../showMenu";
import { ModalMessage, ModalSettings } from "./modal";
import "./main.css";

const data = {
  labels: [
        "Отлично",
        "Хорошо",
        "Удовлетворительно",
    ],
    datasets: [
        {
            data: [1, 2, 1],
            backgroundColor: [
                "red",
                "blue",
                "yellow",
            ],
            borderWidth: 0
        }]
}

const options = {
  plugins: {
    legend: {
      display: false,
    }
  },  
  animation: {
    animateRotate: false,
    animateScale: true
  }
}


const Main = () => {
  return(
  <>
    <Menu/>
    <div className="main-block" >
      <button onClick={ShowMenu} className="navbar-btn" >
        <div className="btn-line"></div>
        <div className="btn-line"></div>
        <div className="btn-line"></div>
      </button>
      <div className="main-info">
        <div className="main-student">
          <img src="img/user-photo.png" alt=""/>
          <div className="main-student-name">
            <p>Хафизова Эльвира</p>
            <p>Таб. № 1139693</p>
          </div>
        </div>
        
        <div className="main-week">
          <p className="main-week-number">12 Неделя</p>
          <i>Числитель</i>
        </div>
        
        <div className="main-setting">
          <button onClick={ModalMessage} className="btn"><img className="main-settings" src="img/message.svg" alt=""/></button>
          <button onClick={ModalSettings} className="btn"><img className="main-settings" src="img/setting.svg" alt=""/></button>
          <Link to="/"><img className="main-settings" src="img/out.svg" alt=""/></Link>
        </div>

      </div>

      <div className="main-block-row">

        <div className="main-tasks">
          <div className="main-tast-info">
            <h3 className="main-task-title">Задачи</h3>
            <button className='btn' onClick={ShowTask}><img className="main-task-add" src="img/plus.svg" alt=""/></button>
            <button className='btn' onClick={HideTask}><img className="main-task-del" src="img/delete.svg" alt=""/></button>
          </div>

          <div className="task-add">
            <div className="task-add-title">
              <input className="task-date-input" type="text" placeholder="Дата"/>
            </div>
            <div className="task-text">
              <textarea className="task-text-input" name="" id="" rows="5"></textarea>
            </div>
            <div className="task-accept">
              <button onClick={AddTask} className="task-accept-btn">Сохранить</button>
            </div>
          </div>

          <div className="task">
            <div className="task-title">
              <div></div>
              <span className="task-date">6 Апреля</span>
              <button onClick={DeleteTask} className="btn"><img className="main-task-img" src="img/remove.svg" alt=""/></button>
            </div>
            <div className="task-text">
              <p>НАПИСАТЬ ДИПОЛМ!!!!!!!</p>
            </div>
          </div>

          <div className="task">
            <div className="task-title">
              <div></div>
              <span className="task-date">7 Апреля</span>
              <button onClick={DeleteTask} className="btn"><img className="main-task-img" src="img/remove.svg" alt=""/></button>
            </div>
            <div className="task-text">
              <p>ПИСАТЬ ДИПОЛМ!!!!!!!</p>
            </div>
          </div>

          <div className="task">
            <div className="task-title">
              <div></div>
              <span className="task-date">8 Апреля</span>
              <button onClick={DeleteTask} className="btn"><img className="main-task-img" src="img/remove.svg" alt=""/></button>
            </div>
            <div className="task-text">
              <p>ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ПРОДОЛЖИТЬ ЕЩЕ ПИСАТЬ ДИПОЛМ!!!!!!!</p>
            </div>
          </div>

        </div>

        <div className="main-progress">
          <div className="main-progress-info">
            <div></div>
            <h3 className="main-progress-title">Успеваемость</h3>
            <i>За все время</i>
          </div>
          <div className="main-progress-cirle">
            <div id="main-progress-diagram">
              <Doughnut  data={data} options={options} />
            </div>
          </div>

          <div className="main-progress-rating">
            <div className="main-progress-1">
              <div className="main-progress-red"></div>
              <span>Отлично</span>
            </div>
            
            <div className="main-progress-2">
              <div className="main-progress-blue"></div>
              <span>Хорошо</span> 
            </div>
            <div className="main-progress-3">
              <div className="main-progress-yellow"></div>
              <span>Удовлитворительно</span>
            </div>
            
          </div>
        </div>
      </div>

      <div className="main-steps">
        <div className="container">
          <ul className="progressbar">
            <li className="main-step-1 active">Поступление</li>
            <li className="main-step-2 active">Step 2</li>
            <li className="main-step-3 active">Step 3</li>
            <li className="main-step-4 active">Step 4</li>
            <li className="main-step-5 active">Step 5</li>
            <li className="main-step-6 active">Step 6</li>
            <li className="main-step-7 active">Step 7</li>
            <li className="main-step-8 active">Step 8</li>
            <li className="main-step-9 active">Step 9</li>
            <li className="main-step-10 active">Step 10</li>
            <li className="main-step-11 active">Step 11</li>
            <li className="main-step-12 active">Step 12</li>
            <li className="main-step-13 active">Step 13</li>
            <li className="main-step-14 active">Гос Экзамены</li>
            <li className="main-step-15">Защита диплома</li>
            <li className="main-step-16">Step 16</li>
          </ul>
        </div>
      </div>

    </div>

    <div className="modal-message">
      <div className="modal-bg"></div>
      <div className="modal-message-content">
        <h3 className="modal-message-title">Сообщения</h3>
      </div>
    </div>
    <div className="modal-setting">
      <div className="modal-bg1"></div>
      <div className="modal-setting-content">
        <h3 className="modal-setting-title">Настройки</h3>
      </div>
    </div>
  </>
  );
};

export default Main;