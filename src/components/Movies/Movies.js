import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const Movies = ({ isSaved }) => {

    return (
        <main className="movies">
            <SearchForm />
            <MoviesCardList isSaved={isSaved}/>
        </main>
    );
};

export default Movies;