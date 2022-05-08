import style from './styles/landing.module.css';
import { IoAirplaneSharp } from 'react-icons/io5';
import { useState, useEffect } from 'react';


export default function Landing() {



const delay = () => {
      setTimeout(() => {
        window.location.href = "http://localhost:3000/home";
  }, 1000);
}



  return (
    <div className={style.hightContainer}>

        <label onClick={() => delay()} className={style.button_container}>
              <input type="checkbox" ></input>
              <p className={style.title}>TAKE OFF</p>
              <div className={style.icon}>
                  <div className={style.shadow}></div>
                  <div className={style.iconBox}>
                      <IoAirplaneSharp className={style.plane_icon}/>
                  </div>
              </div>
        </label>

    </div>
  )
}
