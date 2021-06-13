import React from 'react';
import {Menu} from '../menu/menu';
import {Header} from '../header/header';

export const General_information = () => {
  return(
    <>
      <Menu/>
      <Header/>
      <div className="general_information">
        
        <div className="general_information-info">
          <table>
            <caption><strong>Направление подготовки высшего образования - бакалавриат: 09.03.01 Информатика и вычислительная техника</strong></caption>
            <tbody>
              <tr>
                <th className="th">ФИО</th>
                <td className="general-last-child">Хафизова Эльвира Айдаровна</td>
              </tr>
              <tr>
                <th className="th">Факультет</th>
                <td className="general-last-child">Институт математики, информационных технологий и физики</td>
              </tr>
              <tr>
                <th className="th">Форма обучения</th>
                <td className="general-last-child">Очная</td>
              </tr>
              <tr>
                <th className="th">Квалификация</th>
                <td className="general-last-child">Бакалавр</td>
              </tr>
              <tr>
                <th className="th">Группа</th>
                <td className="general-last-child">ОАБ-09.03.01-41</td>
              </tr>
              <tr>
                <th className="th">Номер зачетки</th>
                <td className="general-last-child">7721</td>
              </tr>
              <tr>
                <th className="th">Профиль/специализация	</th>
                <td className="general-last-child">09.03.01.01 Вычислительные машины, комплексы, системы и сети</td>
              </tr>
            </tbody>
          </table>

        </div>

        <span className="warning">Если обнаружили ошибки, обращайтесь в свой деканат!</span>
      </div>
    </>
    );
  };