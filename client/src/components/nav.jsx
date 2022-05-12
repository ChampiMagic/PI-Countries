import { Link } from 'react-router-dom';
import style from './styles/nav.module.css';
import { TiArrowBack } from "react-icons/ti";
import { MdTravelExplore } from "react-icons/md";
import { FaFly } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { setShowed, changeTernary } from '../store/actions.js';
import { useState } from 'react';
import axios from 'axios';


export default function Nav() {

  const dispatch = useDispatch();
  const ternary = useSelector( (state) => state.ternary);
  const showedCountries = useSelector( (state) => state.showedCountries);
  const [error, setError] = useState()


  const callAlfa = (ternary) => {


  const temporal = showedCountries;
    if(ternary){
      temporal.sort((a, b) => {
        let aT = a.name.toLowerCase();
        let bT = b.name.toLowerCase();

        if(aT < bT) {
          return -1;
        } else if (aT > bT) {
          return 1;
        } else { return 0 }

      } )
      dispatch(changeTernary(false))
    } else if(!ternary){
      temporal.sort((a, b) => {
        let aT = a.name.toLowerCase();
        let bT = b.name.toLowerCase();

        if(aT > bT) {
          return -1;
        } else if (aT < bT) {
          return 1;
        } else { return 0 }

      } )
      dispatch(changeTernary(true))
    }


  dispatch(setShowed(temporal));




}



const callPopulation = (ternary) => {

  const temporal = showedCountries;

  if(ternary){
    temporal.sort((a, b) => {

      return a.population - b.population;
    } )
      dispatch(changeTernary(false))
  } else if(!ternary){
    temporal.sort((a, b) => {
    return b.population - a.population;

    } )
      dispatch(changeTernary(true))
  }


dispatch(setShowed(temporal));
}



const handleSubmit = async (event) => {
  event.preventDefault();
  let value = (event.target["0"].value);

  try {
    const metaData = await axios.get(`http://localhost:3001/countries?name=${value}`)
    dispatch(setShowed(metaData.data))
    setError("");
  } catch(err) {
    console.log(err);
    setError(err.response.data);

  }
}




return (
  <nav className={style.nav}>
    <Link to="/" className={style.goBack}>
      <TiArrowBack className={style.goBack_icon}/>
    </Link>
    <div className={style.create_button_container}>
      <Link to="/form">
        <div className={style.button_icon}>
          <label className={style.create_button}>Create a Trip</label>
        </div>
      </Link>
      <div className={style.order_container}>
          <label className={style.order_title}>Ordenar:</label>
          <div className={style.order_select}>
            <div  onClick={() => callAlfa(ternary)} className={style.order_alfa} >Alfabetico</div>
            <div  onClick={() => callPopulation(ternary)} className={style.order_popu} >Poblacion</div>
          </div>
      </div>
    </div>
    <form className={style.form} onSubmit={(e) => handleSubmit(e)}>
      <MdTravelExplore className={style.search_icon}/>
      <input type="search" placeholder="Busca tu pais" className={ error && style.error_input}  ></input>
      {error? <label className={style.error_message}>{error}</label> : null}
    </form>
    <FaFly className={style.logo}/>

  </nav>
)
}
