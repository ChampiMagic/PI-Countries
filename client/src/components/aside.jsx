import style from './styles/aside.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getActivities, setCurrentPage } from '../store/actions.js';
import { setShowed } from '../store/actions.js';

export default function Aside() {

  const dispatch = useDispatch();

  const activities = useSelector( (state) => state.activities);
  const showedCountries = useSelector( (state) => state.showedCountries);
  const countries = useSelector( (state) => state.countries);

//filter START
const filters = (event) => {

    const cInputs = [...document.getElementsByName('continent')]
    const cInputsBoolean = cInputs.map( i => i.checked);
    const aInputs = [...document.getElementsByName('activity')]
    const aInputsBoolean = aInputs.map( i => i.checked);
      const inputsBoolean = [...cInputsBoolean, ...aInputsBoolean]

  if(event.target.name === 'continent') {
    if(event.target.checked) {

      let tempArr;
      if(aInputsBoolean.includes(true) || (aInputsBoolean.includes(true) && cInputsBoolean.includes(true))) {
        tempArr = (showedCountries.filter( (c) => c.continent === event.target.value));
      } else {
        tempArr = (countries.filter( (c) => c.continent === event.target.value));
      }


      if(tempArr.length){
        dispatch(setCurrentPage(1))
        dispatch(setShowed(tempArr))
      } else {
        event.target.checked = false;
      }
    } else if(!event.target.checked) {
      if(inputsBoolean.includes(true)){

        if(inputsBoolean.includes(true)){
          const specific = aInputs.filter( i => i.checked === true);
            specific.target = specific['0']
            filters(specific);
          }

      } else {
        dispatch(setCurrentPage(1))
        dispatch(setShowed(countries))
      }

    }
  } else if (event.target.name === 'activity'){
    if(event.target.checked) {

      let tempArr;
      if(cInputsBoolean.includes(true) || (aInputsBoolean.includes(true) && cInputsBoolean.includes(true)) ) {
        tempArr = (showedCountries.filter( (c) => {

          for(let i = 0; i < c.Activities.length; i++) {
            return c.Activities[i].name === event.target.value
          }


        }));

      } else {
        tempArr = (countries.filter( (c) => {

          for(let i = 0; i < c.Activities.length; i++) {
            return c.Activities[i].name === event.target.value
          }


        }));
      }

      if(tempArr.length){
        dispatch(setCurrentPage(1))
        dispatch(setShowed(tempArr))
      } else {
        event.target.checked = false;
      }
    } else if(!event.target.checked ) {
      if(inputsBoolean.includes(true)){
        const specific = cInputs.filter( i => i.checked === true);
          specific.target = specific['0']
          filters(specific);


      } else {
        dispatch(setCurrentPage(1))
        dispatch(setShowed(countries))
      }
    }
  }



  }
//filters END



const uniqueArr = [];
activities.forEach((item)=>{
    	//pushes only unique element
        if(!uniqueArr.includes(item.name)){
    		uniqueArr.push(item.name);
    	}
    })

useEffect(() => {

  dispatch(getActivities());


}, [dispatch])


  return (
    <div onChange={(e) => filters(e)} className={style.aside_container}>
      <div>
        <h4 className={style.subTitle}>Countries:</h4>
        <div className={style.options_container}>
          <div className={style.option}>
            <input  value="South America" name="continent" type="checkbox"></input>
            <label>America del Sur</label>
          </div>
          <div className={style.option}>
            <input value="North America" name="continent" type="checkbox"></input>
            <label>America del Norte</label>
          </div>
          <div className={style.option}>
            <input  value="Asia" name="continent" type="checkbox"></input>
            <label>Asia</label>
          </div>
          <div className={style.option}>
            <input  value="Africa" name="continent" type="checkbox"></input>
            <label>Africa</label>
          </div>
          <div className={style.option}>
            <input  value="Oceania" name="continent" type="checkbox"></input>
            <label>Oceania</label>
          </div>
          <div className={style.option}>
            <input  value="Europe" name="continent" type="checkbox"></input>
            <label>Europa</label>
          </div>
          <div className={style.option}>
            <input  value="Antarctica"  name="continent" type="checkbox"></input>
            <label>Antartida</label>
          </div>
        </div>
      </div>
      <div>
        <h4 className={style.subTitle}>Activities:</h4>
        <div  className={style.options_container}>
          {uniqueArr.map((a) => (
            <div key={a} className={style.option}>
              <input type="checkbox" value={a}  name="activity"></input>
              <label>{a}</label>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}
