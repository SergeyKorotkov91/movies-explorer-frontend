import './MoviesCardList.css';
import MovieCard from '../MovieCard/MovieCard';
import { useState, useEffect, useCallback } from 'react';
import { MOVIES_CONFIG } from '../../utils/constants';
import Preloader from '../Preloader/Preloader';

const getDevice = () => (window.innerWidth >= 1024 ? 'desktop' : window.innerWidth >= 768 ? 'tablet' : 'mobile');

const MoviesCardList = ({ mode, movies, saveMovie, unsaveMovie, searchQuery }) => {
  const [amountOfMovies, setAmountOfMovies] = useState(MOVIES_CONFIG[getDevice()].initial);

  useEffect(() => {
    setAmountOfMovies(MOVIES_CONFIG[getDevice()].initial);
  }, [searchQuery]);

  const fetchMoreMovies = useCallback(
    () => setAmountOfMovies((amountOfMovies) => amountOfMovies + MOVIES_CONFIG[getDevice()].more),
    [],
  );

  useEffect(() => {
    if (mode === 'all') {
      const cb = setAmountOfMovies((amountOfMovies) => Math.max(amountOfMovies, MOVIES_CONFIG[getDevice()].initial));
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    }
  }, [mode]);

  if (!movies) {
    return (
      <section className="cards">
        <Preloader />;
      </section>
    );
  }

  if (movies.length === 0) {
    return (
      <section className="cards">
        <p className="cards__search-error">По вашему запросу ничего не найдено</p>
      </section>
    );
  }

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.slice(0, amountOfMovies).map((movie) => (
          <li className="cards__element" key={movie.id}>
            <MovieCard
              key={movie.id}
              movie={movie}
              mode={mode}
              save={() => saveMovie(movie)}
              unsave={() => unsaveMovie(movie)}
            />
          </li>
        ))}
      </ul>

      <button className="cards__more" type="button" onClick={fetchMoreMovies} hidden={amountOfMovies >= movies.length}>
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;
