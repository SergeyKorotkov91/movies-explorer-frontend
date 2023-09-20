import './AboutMe.css';
import photo from '../../images/men.jpg';
const AboutMe = () => {

    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <div className="about-me__container">
                <img className="about-me__photo" alt="Фотография владельца страницы" src={photo} />
                <div className="about-me__info">
                    <h3 className="about-me__name">Виталий</h3>
                    <p className="about-me__about">Фронтенд-разработчик, 30 лет</p>
                    <p className="about-me__description">Я родился и живу в Саратове, 
                    закончил факультет экономики СГУ. У меня есть жена и дочь. 
                    Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
                    С 2015 года работал в компании «СКБ Контур». После того, 
                    как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами 
                    и ушёл с постоянной работы.</p>
                    <a className="about-me__git" href='https://github.com/SergeyKorotkov91' target="_blank" rel="noreferrer">Github</a>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;