import { Link } from 'react-router-dom';
import style from './styles/nav.module.css';


export default function Nav() {
return (
  <nav className={style.nav}>
    <Link to="/">
      <label>Go Back!</label>
    </Link>
    <div className={style.filters_container}>
      <select className={style.filters_1}>
        <option>Asia</option>
      </select>
      <select className={style.filter_2}>
          <option>Sky</option>
      </select>
      <label className={style.create_button}>Create a Trip</label>
    </div>
    <form className={style.form}>
      <input type="search" placeholder="Busca tu pais" ></input>
    </form>

  </nav>
)
}
