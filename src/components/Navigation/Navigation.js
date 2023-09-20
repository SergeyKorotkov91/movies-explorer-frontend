import './Navigation.css';
import { NavLink } from 'react-router-dom';

const Navigation = ({ isLogged, onBurgerClick }) => {

    return (
        <nav className="navigation">
            {!isLogged
                ?
                <>
                    <NavLink className="navigation__link" to="/signup">Регистрация</NavLink>
                    <NavLink className="navigation__link" to="/signin">
                        <span className="navigation__entrance">Войти</span>
                    </NavLink>
                </>
                :
                <>
                    <div className="navigation__menu">
                        <NavLink className="navigation__navlink" to="/movies" >Фильмы</NavLink>
                        <NavLink className="navigation__navlink" to="/saved-movies" >Сохранённые фильмы</NavLink>
                        <div className="navigation__profile">
                            <NavLink className="navigation__navlink" to="/profile" >
                                <span className="navigation__account">Аккаунт</span>
                            </NavLink>
                            <button className="navigation__menu-button" type="button"/>
                        </div>
                    </div>

                    <div className="menu-burger" onClick={onBurgerClick}>
                        <span></span>
                    </div>
                    
                </>
            }
        </nav >
    );
}

export default Navigation;