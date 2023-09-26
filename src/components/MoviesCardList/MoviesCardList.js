import "./MoviesCardList.css";
import MovieCard from "../MovieCard/MovieCard";
import { useState, useEffect, useCallback } from "react";

const computeMinimumAmountOfMovies = () => (
  window.innerWidth >= 1024 ? 12 :
  window.innerWidth >= 768 ? 8 :
  5
);

const MoviesCardList = ({ mode, movies, saveMovie, unsaveMovie, searchQuery }) => {
  const [amountOfMovies, setAmountOfMovies] = useState(computeMinimumAmountOfMovies());

  useEffect(() => {
    setAmountOfMovies(computeMinimumAmountOfMovies());
  }, [searchQuery]);


  const fetchMoreMovies = useCallback(() => setAmountOfMovies((amountOfMovies) =>
    window.innerWidth >= 1024 ? amountOfMovies + 3 :
    window.innerWidth >= 768 ? amountOfMovies + 2 :
    amountOfMovies + 2
  ), []);

  useEffect(() => {
    if (mode === 'all') {
      const cb = setAmountOfMovies((amountOfMovies) => Math.max(amountOfMovies, computeMinimumAmountOfMovies()));
      window.addEventListener('resize', cb);
      return () => window.removeEventListener('resize', cb);
    }
  }, [mode]);

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.slice(0, amountOfMovies).map((movie) => (
          <li className="cards__element" key={movie.id}>
            <MovieCard key={movie.id} movie={movie} mode={mode} save={() => saveMovie(movie)} unsave={() => unsaveMovie(movie)} />
          </li>
        ))}
      </ul>

      <button
        className="cards__more"
        type="button"
        onClick={fetchMoreMovies}
        hidden={amountOfMovies >= movies.length}
      >
        Ещё
      </button>
    </section>
  );
};

export default MoviesCardList;
