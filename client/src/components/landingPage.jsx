import { Link } from 'react-router-dom';
import style from './styles/landing.module.css';


export default function Landing() {

  return (
    <div className={style.hightContainer}>
      <label className={style.button_container}>
        <input type="checkbox" ></input>
        <div className={style.icon}>
          <div className={style.shadow}></div>
          <div className={style.iconBox}></div>
        </div>
      </label>
    </div>

  )
}
