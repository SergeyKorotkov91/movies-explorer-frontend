import './NotFound.css';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="not-found">
      <section className="not-found__box">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__text">Страница не найдена</p>
      </section>
      <NavLink to="/" className="not-found__link">
        Назад
      </NavLink>
    </main>
  );
};

export default NotFound;
