import style from './styles/article.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, setCurrentPage } from '../store/actions.js';
import Card from './card.jsx';
import Paginated from './paginated.jsx';
import { Link } from 'react-router-dom';


export default function Article() {

  const currentPage = useSelector( (state) => state.currentPage);
  const [cardsPerPages, setCarsPerPages] = useState(10);
  const [delay, setDelay] = useState(false);
  const ternary = useSelector( (state) => state.ternary);

  const dispatch = useDispatch();
  const showedCountries = useSelector( (state) => state.showedCountries)

  useEffect( () => {

    dispatch(getCountries());

  }, [dispatch])

  //calculo para el paginado
  const lastCardIndex = currentPage * cardsPerPages;
  const firstCardIndex = lastCardIndex - cardsPerPages;
  const currentCards = showedCountries.slice(firstCardIndex, lastCardIndex)

  const changePage = (number) => {
    dispatch(setCurrentPage(number));
    setDelay(true);
    setTimeout(() => {
      setDelay(false)
}, 250)
  }

if(!showedCountries.length) {
  return (
    <div className={style.notFound}>
      <div className={style.notFound_constainer}>
        <p>Not Found</p>
      </div>
    </div>
  )
}

  return (
      <div className={style.article}>
      {delay? <div className={style.delay}>Loading</div> :
        <div className={style.cards_container}>
          {currentCards?.map( c => (
          <Link key={c.name} to={`/home/${c.id}`}>
            <Card key={c.id} name={c.name} continent={c.continent} image={c.flag} population={c.population}/>
          </Link>
          ))}
        </div>
      }

        <Paginated changer={changePage} allCards={showedCountries.length} cardsPerPages={cardsPerPages} currentPage={currentPage}/>
      </div>
  )
}
