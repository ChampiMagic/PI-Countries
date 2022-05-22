import style from './styles/landing.module.css';
//import { IoAirplaneSharp } from 'react-icons/io5';
import { useEffect, useState } from 'react';


export default function Landing() {

const [refresh, setRefresh] = useState(1);

const delay = (e) => {
      setTimeout(() => {
          e.target.checked = false;
        window.location.href = window.location.href + "home"
  }, 1000);
}


  return (
    <div  className={style.hightContainer}>

        <label data-testid="landing_button" onClick={(e) => delay(e)} className={style.button_container}>
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
