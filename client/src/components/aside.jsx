import style from './styles/aside.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getActivities, setCurrentPage } from '../store/actions.js';
import { setShowed } from '../store/actions.js';

export default function Aside() {

  const continents = ["South America", "North America", "Asia", "Africa", "Europe", "Antarctica", "Oceania"]

  const dispatch = useDispatch();
  const activities = useSelector( (state) => state.activities);
  const showedCountries = useSelector( (state) => state.showedCountries);
  const countries = useSelector( (state) => state.countries);

//filter
const filter = () => {
  const inputsRadio = [...document.getElementsByName("activity")];
  const trueInputsR = inputsRadio.filter( (e) => e.checked === true);
  const inputsCheckbox = [...document.getElementsByName("continent")];
  const trueInputsC = inputsCheckbox.filter( (e) => e.checked === true);


  if(trueInputsR[0].value === "all" && !trueInputsC.length) {

      dispatch(setShowed(countries));
      dispatch(setCurrentPage(1));

  } else if(trueInputsR[0].value === "all" && trueInputsC.length) {

      const countriesToShow = countries.filter( c => {
        for(const element of trueInputsC) {
          if(element.value === c.continent) return true;
        }
      })
      dispatch(setShowed(countriesToShow));
      dispatch(setCurrentPage(1));

  } else if(trueInputsR[0].value !== "all" && !trueInputsC.length) {

    const countriesToShow = countries.filter( c => {
      for(const activity of c.Activities) {
        if(activity.name === trueInputsR[0].value) return true;
      }
    })
    dispatch(setShowed(countriesToShow));
    dispatch(setCurrentPage(1));

  } else if(trueInputsR[0].value !== "all" && trueInputsC.length) {

    const countriesForContinent = countries.filter( c => {
      for(const element of trueInputsC) {
        if(element.value === c.continent) return true;
      }
    })
    const countriesToShow = countriesForContinent.filter( c => {
      for(const activity of c.Activities) {
        if(activity.name === trueInputsR[0].value) return true;
      }
    })
    dispatch(setShowed(countriesToShow));
    dispatch(setCurrentPage(1));

  }
}


//Funcion para que no se repitan las actividades
const uniqueArr = [];
activities.forEach((item)=>{
    	//pushes only unique element
        if(!uniqueArr.includes(item.name)){
    		uniqueArr.push(item.name);
    	}
    })
//solo renderizo las primeras 21
const activitiesArr = uniqueArr.slice(0, 20);

//llamamos al action que cargara las actividades
useEffect(() => {

  dispatch(getActivities());


}, [dispatch])

const c = countries.filter( c => {
  const showed = showedCountries.map( c => c.name);
  if(!showed.includes(c.name)) return true
})



  return (
    <div  onChange={() => filter()}className={style.aside_container}>
      <div>
        <h4 className={style.subTitle}>Countries:</h4>
        <div className={style.options_container}>
          {continents.map(c => (
            <div key={c} className={style.option}>
              <input  value={c} name="continent" type="checkbox"></input>
              <label>{c}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h4 className={style.subTitle}>Activities:</h4>
        <div  className={style.options_container}>
              <div  className={style.option}>
                <input type="radio" value="all"  name="activity" defaultChecked></input>
                <label>all</label>
              </div>
          {activitiesArr.map((a) => (
            <div key={a} className={style.option}>
              <input type="radio" value={a}  name="activity"></input>
              <label>{a}</label>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}
