import './Footer.css';

const Footer = () => {

    return (
        <footer className="footer">
            <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className="footer__container">
                <ul className="footer__info">
                    <li className="footer__element">
                        <a className="footer__yandex" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li className="footer__element">
                        <a className="footer__git" href="https://github.com/" target="_blank" rel="noreferrer">Github</a>
                    </li>
                </ul>
                <p className="footer__date">©2023</p>
            </div>
        </footer>
    );
};

export default Footer;