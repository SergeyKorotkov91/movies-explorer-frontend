import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useLocation, NavLink } from 'react-router-dom';

const Header = ({ isLogged, onBurgerClick }) => {

    const { pathname } = useLocation();

    return (
        <header className={`header ${pathname === '/' ? ' header_main' : ''}`}>
            <NavLink className="header__link" to="/">
                <img className="header__logo" src={logo} alt="Логотип" />
            </NavLink>
            <Navigation isLogged={isLogged} onBurgerClick={onBurgerClick} />
        </header>
    );
};

export default Header;