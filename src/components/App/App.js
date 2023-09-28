import './App.css';
import { useCallback, useEffect, useState } from 'react';
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
import { EMPTY_QUERY, MOVIES_MODE, PROFILE_MODE, USER_TYPE } from '../../utils/constants';
import { ServerErrorContext } from '../../contexts/ServerError';

function App() {
  const [user, setUser] = useState({ type: USER_TYPE.pending });
  const [userMovies, setUserMovies] = useState(new Map());
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogining, setIsLogining] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState('');
  const [profileMode, setProfileMode] = useState(PROFILE_MODE.viewing);

  useEffect(() => {
    setServerError('');
    setProfileMode(PROFILE_MODE.viewing);
  }, [pathname]);

  async function onLogin(data) {
    try {
      setIsLogining(true);
      await mainApi.signin(data);
      setUser({ type: USER_TYPE.loggedIn, user: await mainApi.getUser() });
      navigate('/movies');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsLogining(false);
    }
  }

  async function onRegister(data) {
    try {
      setIsRegistering(true);
      const res = await mainApi.signup(data);
      onLogin({ email: res.email, password: data.password });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setIsRegistering(false);
    }
  }

  async function onSignout() {
    try {
      await mainApi.signout();
      setUser({ type: USER_TYPE.stranger });
      setUserMovies(new Map());
      navigate('/');
      localStorage.clear();
    } catch (err) {
      setServerError(err.message);
    }
  }

  function startEditingProfile() {
    setProfileMode(PROFILE_MODE.editing);
  }

  async function onUpdateProfile(data) {
    try {
      setProfileMode(PROFILE_MODE.saving);
      await new Promise((r) => setTimeout(r, 2000));
      const user = await mainApi.updateUser(data);
      setUser({ type: USER_TYPE.loggedIn, user });
      setProfileMode(PROFILE_MODE.viewing);
    } catch (err) {
      setServerError(err.message);
    }
  }

  const closePopup = useCallback(() => setIsPopupOpen(false), []);
  const openPopup = useCallback(() => setIsPopupOpen(true), []);

  const searchMovies = useCallback(
    (query) => {
      return moviesApi.search(query).then((movies) => {
        return movies
          .map((movie) => ({ ...movie, saved: userMovies.has(movie.id) }))
          .filter((movie) => (query.mode === MOVIES_MODE.saved ? movie.saved : true));
      });
    },
    [userMovies],
  );

  const saveMovie = useCallback(
    async (movie) => {
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
    },
    [userMovies],
  );

  const unsaveMovie = useCallback(
    async (movie) => {
      await mainApi.deleteMovie(userMovies.get(movie.id)._id);

      const newUserMovies = new Map(userMovies);
      newUserMovies.delete(movie.id);
      setUserMovies(newUserMovies);
    },
    [userMovies],
  );

  const storeQuery = useCallback((mode, query) => {
    if (mode === MOVIES_MODE.all) {
      localStorage.setItem('searchQuery', JSON.stringify(query));
    }
  }, []);

  const restoreQuery = useCallback((mode, query) => {
    return (mode === MOVIES_MODE.all ? JSON.parse(localStorage.getItem('searchQuery')) : undefined) || EMPTY_QUERY;
  }, []);

  const protect = (condition, jsx) => (condition ? jsx : <Navigate to="/" />);

  if (user.type === USER_TYPE.pending) {
    (async () => {
      const user = await mainApi.getUser().catch(() => null);
      const movieIds = user
        ? (await mainApi.getMovies()).map(
            (x) => [x.movieId, x],
            () => [],
          )
        : [];

      setUser(user ? { type: USER_TYPE.loggedIn, user } : { type: USER_TYPE.stranger });
      setUserMovies(new Map(movieIds));
    })();

    return (
      <div className="App">
        <Preloader />
      </div>
    );
  }

  return (
    <div className="App">
      <ServerErrorContext.Provider value={serverError}>
        <CurrentUserContext.Provider value={user.user}>
          {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && (
            <Header isLogged={user.type === USER_TYPE.loggedIn} onBurgerClick={openPopup} />
          )}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={protect(
                user.type === USER_TYPE.loggedIn,
                <Movies
                  mode={MOVIES_MODE.all}
                  searchMovies={searchMovies}
                  saveMovie={saveMovie}
                  unsaveMovie={unsaveMovie}
                  storeQuery={storeQuery}
                  restoreQuery={restoreQuery}
                />,
              )}
            />
            <Route
              path="/saved-movies"
              element={protect(
                user.type === USER_TYPE.loggedIn,
                <Movies
                  mode={MOVIES_MODE.saved}
                  searchMovies={searchMovies}
                  saveMovie={saveMovie}
                  unsaveMovie={unsaveMovie}
                  storeQuery={storeQuery}
                  restoreQuery={restoreQuery}
                />,
              )}
            />
            <Route
              path="/profile"
              element={protect(
                user.type === USER_TYPE.loggedIn,
                <Profile
                  onSignout={onSignout}
                  onUpdateProfile={onUpdateProfile}
                  mode={profileMode}
                  startEditingProfile={startEditingProfile}
                />,
              )}
            />
            <Route
              path="/signup"
              element={protect(
                user.type === USER_TYPE.stranger,
                <Register onRegister={onRegister} isRegistering={isRegistering} />,
              )}
            />
            <Route
              path="/signin"
              element={protect(user.type === USER_TYPE.stranger, <Login onLogin={onLogin} isLogining={isLogining} />)}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer />}
          <Popup isOpen={isPopupOpen} onClose={closePopup} />
        </CurrentUserContext.Provider>
      </ServerErrorContext.Provider>
    </div>
  );
}

export default App;
