import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Popup from '../Popup/Popup';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {

  const [isLogged, setIsLogged] = useState(false);
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [serverError, setServerError] = useState('');

  function closePopup() {
    setIsPopupOpen(false);
  }

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }

  useEffect(() => {
    const currentPath = window.location.pathname;

    if (currentPath === '/movies' || currentPath === '/saved-movies' || currentPath === '/profile') {
      setIsLogged(true);
    }
    else {
      setIsLogged(false);
    }

  }, []);

  return (
    <div className="App">
      {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile') && <Header isLogged={isLogged} onBurgerClick={handlePopupOpen} />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies isSaved={false} />} />
        <Route path="/saved-movies" element={<Movies isSaved={true} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register serverError={serverError} />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {(pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') && <Footer />}
      <Popup
        isOpen={isPopupOpen}
        onClose={closePopup} />
    </div >
  );
}

export default App;
