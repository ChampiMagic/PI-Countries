import style from './styles/paginated.module.css';
import { setCurrentPage } from '../store/actions.js';
import { useDispatch } from 'react-redux'

export default function Paginated({allCards, cardsPerPages, changer, currentPage}) {

  const pageNumbers = [];
  const dispatch = useDispatch();


  const switchPage = (name) => {

    if(name === "prev") {
      if(currentPage > 1) {dispatch(setCurrentPage(currentPage - 1)) }
    } else if(name === "next") {
      if(currentPage < pageNumbers.length) {dispatch(setCurrentPage(currentPage + 1)) }
    }

  }

  for(let i = 1; i <= Math.ceil(allCards / cardsPerPages); i++) {
    pageNumbers.push(i);
  }


  return (

    <div className={style.buttons_container}>
      {pageNumbers.length === 1 || !pageNumbers.length? null : <button onClick={() => switchPage("prev")} className={style.prevButton}>Prev</button>}
      {pageNumbers?.map( (number) => (
        <button onClick={() => changer(number)} key={number}  className={style.numbersButton}  id={currentPage === number ? style.selected : null } >{number}</button>
      ))}
      {pageNumbers.length === 1 || !pageNumbers.length? null : <button onClick={() => switchPage("next")} className={style.nextButton} >Next</button>}
    </div>

  )
}
