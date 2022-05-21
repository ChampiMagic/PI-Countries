import style from './styles/form.module.css';
import { useSelector} from 'react-redux';
//import { TiArrowBack } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const validator = (input, pushCountries) => {
  let error = {};

  if(!input.name){
    error.name = "name is required";
  } else if (!/^[\w ]{1,18}$/.test(input.name)){
    error.name = "name is invalid";
  }

  if(!input.duration){
    error.duration = "duration is required";
  } else if (!/^(?:[1-3](?:\.5)?|4|0.5)$/.test(input.duration)){
    error.duration = "duration is invalid";
  }

  if(!pushCountries.length) {
    error.search = "one country is required";
  }else if (input.search && !/^[\w . ,]+$/.test(input.search)){
    error.search = "country is invalid";
  }

  if(!input.season){
    error.season = "season is required";
  }

  if(!input.difficulty){
    error.difficulty = "difficulty is required";
  }

  return error;
}


export default function Form() {

  const countriesData = useSelector( (state) => state.countries);
  const countries = countriesData.filter( c => {
    if(c.Activities.length !== undefined && c.Activities.length < 6) return true
  })


  const [currentCountries, setCurrentCountries] = useState([])
  const [selectedCountries, setSelectedCountries] = useState([])
  const [pushCountries, setPushCountries] = useState([]);


  const [input, setInput] = useState({});
  const [error, setError] = useState({});

  const workOnChange = (event) => {

    setInput({
      ...input,
      [event.target.name]: event.target.value,
    })

    setError(validator({
      ...input,
      [event.target.name]: event.target.value,
    }, pushCountries))

  }

  const handleSearch = (event) => {
  let rightNow;
    if(!event.target.value) {
      rightNow = [];
    } else {
      rightNow = countries.filter( c => c.name.includes(event.target.value));
    }
       setCurrentCountries(rightNow.slice(0, 8));

  }

  const handleSubmit = (event) => {

    function isObjectEmpty(obj) {
      for(const prop in obj){
        if(obj.hasOwnProperty(prop)) return false

      }

      return true
    }

    if(!isObjectEmpty(error) || isObjectEmpty(input)) {

      event.preventDefault();
      setError({
        ...error,
        submit: "Falta Informacion"
      })
    } else {
        setInput({
          ...input,
          submit: "Actividad Agregada!"
        })

        axios.post("/activities", {
          name: input.name,
          duration: input.duration,
          difficulty: input.difficulty,
          season: input.season,
          country: pushCountries,
        })

    }
  }

  const addCountry = (event) => {
    const selected = countries.find( c => c.name === event.target.id);
    if(selectedCountries.length <= 7 && !selectedCountries.includes(selected)) {
      setSelectedCountries([...selectedCountries, selected]);
      setPushCountries([...pushCountries, selected.name]);
      const change = currentCountries.filter( c => c.name !== selected.name)
      setCurrentCountries(change)
    }

  };

  const deleteCountry = (event) => {

    const selected = selectedCountries.find( c => c.name === event.target.id);
    const push = pushCountries.filter( c => c !== selected.name);
    setPushCountries(push);

      if(currentCountries.length <= 7 && !currentCountries.includes(selected)) {
        setCurrentCountries([...currentCountries, selected]);
       }
   const change = selectedCountries.filter( c => c.name !== selected.name)
  setSelectedCountries(change);

  }


const dificultades = ["Principiante", "Amateur", "Normal", "Profesional", "Experto"];
const temporadas = ["Primavera", "Verano", "Otoño", "Invierno"];


  return (
    <div className={style.hightContainer}>
      <Link to="/home" className={style.goBack}>
        <div className={style.goBack_icon}></div>
      </Link>
      <div className={style.form_container}>
        <h1 className={style.title}>Agregar Actividades:</h1>
        <form onChange={(e) => workOnChange(e)} onSubmit={(e) => handleSubmit(e)}>
          <div className={style.section}>
            <label>Nombre:</label>
            <input type="text" placeholder="Nombre de la actividad" name="name"></input>
            {error.name && <label className={`${style.error} ${style.errorName}`}>{error.name}</label>}
          </div>
          <div className={style.section}>
            <label>Duracion(hs):</label>
            <input type="number" placeholder="Duracion en horas" max="4" min="0.5" step="0.5" name="duration"></input>
              {error.duration && <label className={`${style.error} ${style.errorDuration}`}>{error.duration}</label>}
          </div>
          <div className={style.section}>
            <label>Paises(max. 8):</label>
            <input onChange={(e) => handleSearch(e)} type="search" placeholder="Nombre del Pais" name="search"></input>
              {error.search && <label className={`${style.error} ${style.errorSearch}`}>{error.search}</label>}
          </div>
          <div className={style.section}>
              <label>Paises Seleccionados:</label>
            <input type="submit" value="Agregar Actividad" ></input>
            {error.submit && <label className={`${style.error} ${style.errorsubmit}`}>{error.submit}</label>}
          </div>
          <div className={`${style.section} ${style.radio_container}`}>
            <label>Dificultad:</label>
            {dificultades.map(d => (
              <div key={d} className={style.subRadio_container}>
                  <input type="radio" value={d} name="difficulty"/>
                  <label>{d}</label>
              </div>
            ))}
            {error.difficulty && <label className={`${style.error} ${style.errorDifficulty}`}>{error.difficulty}</label>}
          </div>
          <div className={`${style.section} ${style.radio_container}`}>
            <label>Temporada:</label>
            {temporadas.map(t => (
              <div key={t} className={style.subRadio_container}>
                  <input type="radio" value={t} name="season"/>
                  <label>{t}</label>
              </div>
            ))}
            {error.season && <label className={`${style.error} ${style.errorSeason}`}>{error.season}</label>}
          </div>
          <div className={`${style.section} ${style.section_show}`}>

            <div className={style.show_countries}>
              {!currentCountries.length? null :   currentCountries?.map( c => (

                <div key={c.key} className={style.country_container}>
                  <div>
                    <div className={style.img_container}>
                      <img src={c.flag} alt={c.id}/>
                    </div>
                    <p>{c.name}</p>
                  </div>
                  <div onClick={(e) => addCountry(e)} className={style.country_button} id={c.name} ><b id={c.name} >+</b></div>
                </div>
              ))}

            </div>
          </div>
          <div className={`${style.section} ${style.section_show}`}>

            <div className={style.show_countries}>
              {!selectedCountries.length? null :   selectedCountries?.map( c => (

                <div key={c.key} className={style.country_container}>
                  <div>
                    <div className={style.img_container}>
                      <img src={c.flag} alt={c.id}/>
                    </div>
                    <p>{c.name}</p>
                  </div>
                  <div onClick={(e) => deleteCountry(e)}  className={style.country_button_out} id={c.name} ><b id={c.name}>-</b></div>
                </div>
              ))}

            </div>
          </div>

        </form>
      </div>

    </div>
  )
}