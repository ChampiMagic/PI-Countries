import Nav from './nav.jsx';
import Aside from './aside.jsx';
import Article from './article.jsx';
import style from './styles/home.module.css';

export default function Home() {


return (
  <div className={style.heightContainer}>
    <div className={style.home}>
      <Nav />
      <Aside />
      <Article />
    </div>
  </div>
)
}
