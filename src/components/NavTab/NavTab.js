import './NavTab.css';

const NavTab = () => {
    return (
        <nav className="navtab">
            <ul className="navtab__list">
                <li className="navtab__element">
                    <a className="navtab__link" href="#aboutprog">О проекте</a>
                </li>
                <li className="navtab__element">
                    <a className="navtab__link" href="#tech">Технологии</a>
                </li>
                <li className="navtab__element">
                    <a className="navtab__link" href="#aboutme">Студент</a>
                </li>
            </ul>
        </nav >
    );
}

export default NavTab;