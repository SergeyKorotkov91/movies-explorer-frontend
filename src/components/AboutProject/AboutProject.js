import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" id="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <ul className="about-project__info">
        <li className="aabout-project__item">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className="about-project__item">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>

      <div className="about-project__diagram">
        <div className="little-column">
          <p className="little-column__diagram little-column__diagram_black">1 неделя</p>
          <p className="little-column__diagram little-column__diagram_white">Back-end</p>
        </div>
        <div className="big-column">
          <p className="big-column__diagram big-column__diagram_gray">4 недели</p>
          <p className="big-column__diagram big-column__diagram_white">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
