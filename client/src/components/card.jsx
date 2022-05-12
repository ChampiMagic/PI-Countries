import style from './styles/card.module.css';

export default function Card({name, continent, image}) {


  return (
    <div className={style.card_container}>

    <figure>
      <img src={image} alt={name}/>
      <div className={style.capa}>
        <h1>{name}</h1>
      </div>
    </figure>

    <h3>{continent}</h3>

    </div>
  )
}
