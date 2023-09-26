import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';

const Movies = ({ mode, searchMovies, saveMovie, unsaveMovie }) => {
    const [movies, setMovies] = useState();
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        searchMovies({...searchQuery, saved: mode === 'saved'}).then((movies) => setMovies(movies))
    }, [searchQuery, mode, searchMovies]);

    return (
        <main className="movies">
            <SearchForm onSearch={setSearchQuery} />
            {movies ? <MoviesCardList searchQuery={searchQuery} mode={mode} movies={movies} saveMovie={saveMovie} unsaveMovie={unsaveMovie} /> : <Preloader/>}
        </main>
    );
};

export default Movies;
