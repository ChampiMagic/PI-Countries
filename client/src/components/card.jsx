import style from './styles/card.module.css';

export default function Card({name, continent, image, population}) {

  function separator(numb) {
    if(numb){
      var str = numb.toString().split(".");
      str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return str.join(".");
    } else {return null}

}


  return (
    <div className={style.card_container}>

    <figure>
      <img src={image} alt={name}/>
      <div className={style.capa}>
        <h1>{name}</h1>
      </div>
    </figure>

    <h3>{continent}</h3>
    <h3>Population: {separator(population)}</h3>

    </div>
  )
}
