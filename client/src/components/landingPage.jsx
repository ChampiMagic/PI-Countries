import style from './styles/landing.module.css';
//import { IoAirplaneSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';
const {
  REACT_APP_API,
} = process.env;

export default function Landing() {



const delay = () => {
      setTimeout(() => {
        window.location.href = REACT_APP_API || "http://localhost:3000/home";
  }, 1000);
}



  return (
    <div  className={style.hightContainer}>

        <label data-testid="landing_button" onClick={() => delay()} className={style.button_container}>
              <input type="checkbox" ></input>
              <p className={style.title}>TAKE OFF</p>
              <div className={style.icon}>
                  <div className={style.shadow}></div>
                  <div className={style.iconBox}>
                      <div className={style.plane_icon}></div>
                  </div>
              </div>
        </label>

    </div>
  )
}
