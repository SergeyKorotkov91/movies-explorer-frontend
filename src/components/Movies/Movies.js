import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

const Movies = ({ mode, searchMovies, saveMovie, unsaveMovie, storeQuery, restoreQuery }) => {
  const [movies, setMovies] = useState();
  const [searchQuery, setSearchQuery] = useState(() => restoreQuery(mode));

  useEffect(() => {
    setSearchQuery(restoreQuery(mode));
  }, [mode, restoreQuery]);

  useEffect(() => {
    (async () => {
      setMovies(null);
      storeQuery(mode, searchQuery);
      setMovies(await searchMovies({ ...searchQuery, mode }));
    })();
  }, [searchQuery, mode, searchMovies, storeQuery]);

  return (
    <main className="movies">
      <SearchForm onSearch={setSearchQuery} searchQuery={searchQuery} mode={mode} />
      <MoviesCardList
        searchQuery={searchQuery}
        mode={mode}
        movies={movies}
        saveMovie={saveMovie}
        unsaveMovie={unsaveMovie}
      />
    </main>
  );
};

export default Movies;
