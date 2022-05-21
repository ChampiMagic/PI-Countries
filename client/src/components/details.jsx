import { useParams, Link } from 'react-router-dom';
import style from './styles/details.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import { TiArrowBack } from "react-icons/ti";

export default function Details() {

  function separator(numb) {
    if(numb){
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return str.join(".");
    } else {return null}

}


const params = useParams();
const [country, setCountry] = useState([{}]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const axiosPost = async (params) => {
    setLoading(true)
    const res = await axios.get(`/countries/${params.id}`);

    setCountry(res.data[0]);
    setLoading(false)
  }

  axiosPost(params);
}, [params])

if(loading){
  return (
    <h1 className={style.loading}>Loading...</h1>
  )
}

console.log(country.Activities)

  return (
    <div className={style.heigthContainer}>
      <div className={style.lowContainer}>
          <Link to="/home" className={style.goBack}>
            <div className={style.goBack_icon}></div>
          </Link>
          <div className={style.img_container}>
            <img src={country.flag} alt={country.name} />
            <h1>{country.name}</h1>
          </div>
          <div className={style.details_container}>
              <div className={style.country_details}>
                <h2>Detalles:</h2>
                <div>
                  <p>CCA3:</p>
                  <p>{country.id}</p>
                </div>
                <div>
                  <p>Continente:</p>
                  <p>{country.continent}</p>
                </div>
                <div>
                  <p>Capital:</p>
                  <p>{country.capital}</p>
                </div>
                <div>
                  <p>Subregion:</p>
                  <p>{country.subregion}</p>
                </div>
                <div>
                  <p>Area(Km2):</p>
                  <p>{separator(country.area)} Km²</p>
                </div>
                <div>
                  <p>Poblacion:</p>
                  <p>{country.population}</p>
                </div>
              </div>
              <div className={style.activities_container}>
                  <h2>Actividades:</h2>
                  {country.Activities === undefined || !country.Activities.length? <label className={style.notFound}>Not Activities Found</label> :

                    <div className={style.activities_detail_container}>
                        {country.Activities.map( a => (
                            <div key={a.id} className={style.activities_detail}>
                              <div>
                                <p>Name:</p>
                                <p>{a.name}</p>
                              </div>
                              <div>
                                <p>Dificultad:</p>
                            <p>{a.difficulty}</p>
                              </div>
                              <div>
                                <p>Duracion(Hs):</p>
                              <p>{a.duration}</p>
                              </div>
                              <div>
                                <p>Temporada:</p>
                              <p>{a.season}</p>
                              </div>
                            </div>
                          ))

                        }
                      </div>
                  }

              </div>
          </div>

      </div>

    </div>
  )
}
