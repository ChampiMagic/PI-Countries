import { Link } from 'react-router-dom';
import style from './styles/nav.module.css';
//import { TiArrowBack } from "react-icons/ti";
//import { MdTravelExplore } from "react-icons/md";
//import { FaFly } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { setShowed, changeTernary, setCurrentPage } from '../store/actions.js';
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

        let aT = "";
        let bT = "";

        if(a.name.includes('Å')) {
          let T = a.name.replace('Å', 'A')
          aT = T.toLowerCase();
        } else {aT = a.name.toLowerCase()}

        if(b.name.includes("Å")) {
          let T = b.name.replace('Å', 'A')
          bT = T.toLowerCase();
        } else { bT = b.name.toLowerCase()}






        if(aT < bT) {
          return -1;
        } else if (aT > bT) {
          return 1;
        } else { return 0 }

      } )
      dispatch(changeTernary(false))
    } else if(!ternary){
      temporal.sort((a, b) => {


      let aT = "";
      let bT = "";

      if(a.name.includes('Å')) {
        let T = a.name.replace('Å', 'A')
        aT = T.toLowerCase();
          } else {aT = a.name.toLowerCase()}

      if(b.name.includes("Å")) {
        let T = b.name.replace('Å', 'A')
        bT = T.toLowerCase();
          } else { bT = b.name.toLowerCase()}

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



const handleChange = async (event) => {
  const inputsRadio = [...document.getElementsByName("activity")];
  for(const input of inputsRadio) {
    if(input.value === "all") {input.checked = true}
    else { input.checked = false}
  }
  const inputsCheckbox = [...document.getElementsByName("continent")];
  for(const input of inputsCheckbox) {
    input.checked = false;
  }


  event.preventDefault();
  let value = (event.target.value);




  try {
    dispatch(setCurrentPage(1));
    const metaData = await axios.get(`/countries?name=${value}`)
    dispatch(setShowed(metaData.data))
    setError("");
  } catch(err) {
    console.log(err);
    setError(err.response.data);

  }
  if(!value){

  }
}




return (
  <nav className={style.nav}>
    <Link to="/" className={style.goBack}>
      <div className={style.goBack_icon}></div>
    </Link>
    <div className={style.buttons_container}>
      <Link to="/form">
        <div className={style.create_button}>Create an Activity</div>
      </Link>
      <div className={style.order_container}>
          <label className={style.order_title}>Sort Countries for:</label>
          <div className={style.order_select}>
            <div data-testid="button" onClick={() => callAlfa(ternary)} className={style.order_alfa} >Name</div>
            <div  onClick={() => callPopulation(ternary)} className={style.order_popu} >Population</div>
          </div>
      </div>
    </div>
    <form className={style.form} onChange={(e) => handleChange(e)}>
      <div className={style.search_icon}></div>
      <input type="search" placeholder="Search your country" className={ error && style.error_input}  ></input>
      {error? <label className={style.error_message}>{error}</label> : null}
    </form>
    <div className={style.logo}></div>

  </nav>
)
}
