import style from './styles/paginated.module.css';

export default function Paginated({allCards, cardsPerPages, changer}) {

  const pageNumbers = [];

  for(let i = 1; i < (allCards / cardsPerPages); i++) {
    pageNumbers.push(i);
  }

  return (

    <div className={style.buttons_container}>
      {pageNumbers?.map( (number) => (
        <button onClick={() => changer(number)} key={number} >{number}</button>
      ))}
    </div>

  )
}
