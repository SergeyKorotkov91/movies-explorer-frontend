import './App.css';
import { useCallback, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';

const handleError = (status, path) => 'аааааааа error 1111';

function App() {
  const [user, setUser] = useState({type: 'pending'});
  const [userMovies, setUserMovies] = useState(new Map());
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState('');

  async function onLogin(data) {
    try {
      await mainApi.signin(data);
      setUser({type: 'logged-in', user: await mainApi.getUser()});
      navigate('/movies', { replace: true });
    } catch (err) {
      setServerError(handleError(err, '/singin'));
    }
  }

  async function onRegister(data) {
    try {
      const res = await mainApi.signup(data);
      onLogin({ email: res.email, password: data.password });
    } catch (err) {
      setServerError(handleError(err, '/signup'));
    }
  }

  async function onSignout() {
    try {
      await mainApi.signout();
      setUser({type: 'stranger'});
      setUserMovies(new Map());
      navigate('/', { replace: true });
    } catch (err) {
      setServerError(handleError(err, '/signout'));
    }
  }

  async function onUpdate(data) {
    try {
      const user = await mainApi.updateUser(data);
      setUser({type: 'logged-in', user});
    } catch (err) {
      setServerError(handleError(err, '/signup'));
    }
  }


  const closePopup = useCallback(() => setIsPopupOpen(false), []);
  const openPopup = useCallback(() => setIsPopupOpen(true), []);

  const searchMovies = useCallback((query) => {
    return moviesApi.search(query).then((movies) => {
      return movies
        .map((movie) => ({...movie, saved: userMovies.has(movie.id)}))
        .filter((movie) => query.saved ? movie.saved : true);
    })
  }, [userMovies]);

  const saveMovie = useCallback(async (movie) => {
    const newMovie = await mainApi.addMovie({
      country: movie._.country,
      director: movie._.director,
      duration: movie._.duration,
      year: movie._.year,
      description: movie._.description,
      image: movie.image,
      trailerLink: movie._.trailerLink,
      thumbnail: movie.thumbnail,
      movieId: movie._.movieId,
      nameRU: movie._.nameRU,
      nameEN: movie._.nameEN,
    });

    const newUserMovies = new Map(userMovies);
    newUserMovies.set(newMovie.movieId, newMovie);
    setUserMovies(newUserMovies);
  }, [userMovies]);

  const unsaveMovie = useCallback(async (movie) => {
    await mainApi.deleteMovie(userMovies.get(movie.id)._id);

    const newUserMovies = new Map(userMovies);
    newUserMovies.delete(movie.id);
    setUserMovies(newUserMovies);
  }, [userMovies]);

  const protect = (jsx) => user.type === 'logged-in' ? jsx : <Navigate to="/" replace/>;

  if (user.type === 'pending') {
    (async () => {
      const user = await mainApi.getUser().catch(() => null);
      const movieIds = user ? (await mainApi.getMovies()).map((x) => [x.movieId, x], () => []) : [];

      setUser(user ? {type: 'logged-in', user} : {type: 'stranger'});
      setUserMovies(new Map(movieIds));
    })();

    return <div className="App"><Preloader /></div>;
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={user.user}>
          {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header isLogged={user.type === 'logged-in'} onBurgerClick={openPopup} />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies" element={protect(<Movies mode="all" searchMovies={searchMovies} saveMovie={saveMovie} unsaveMovie={unsaveMovie} />)} />
            <Route path="/saved-movies" element={protect(<Movies mode="saved" searchMovies={searchMovies} saveMovie={saveMovie} unsaveMovie={unsaveMovie} />)} />
            <Route path="/profile" element={protect(<Profile onSignout={onSignout} onUpdate={onUpdate}/>)} />
            <Route path="/signup" element={<Register onRegister={onRegister} serverError={serverError} />} />
            <Route path="/signin" element={<Login onLogin={onLogin} serverError={serverError}/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer />}
          <Popup
            isOpen={isPopupOpen}
            onClose={closePopup} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
