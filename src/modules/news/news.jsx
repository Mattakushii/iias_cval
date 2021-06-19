import React from 'react';
import {Menu} from '../menu/menu';
import {Header} from '../header/header';
import data from './newsjs.json';

export const News = () => {
  return(
    <>
      <Menu/>
      <Header/>
      {
        Object.keys(data).map((item) =>
        <div className="news" key={data[item].id}>
          <img className="news-img" src={data[item].photo} alt=""/>
          <p className="news-text">{data[item].text}</p>
        </div>
      )};
    </>
    );
  };