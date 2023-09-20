import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import cards from './cards'

const MoviesCardList = ({ isSaved }) => {

  const [amountOfCards, setAmountOfCards] = useState(12);
  const [isAllCards, setIsAllCards] = useState(false);

  function setInitialNumber() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1024) {
      setAmountOfCards(12)
    };
    if ((windowWidth >= 768) && (windowWidth < 1024)) {
      setAmountOfCards(8)
    };
    if (windowWidth < 768) {
      setAmountOfCards(5)
    };

  }

  function addCards() {

    setAmountOfCards(amountOfCards + 3);
  }

  function checkIsAllCards() {

    cards.length < amountOfCards
      ?
      setIsAllCards(true)
      :
      setIsAllCards(false)

  }

  useEffect(() => {

    checkIsAllCards();

  })

  useEffect(() => {

    setInitialNumber()

  }, [])

  return (
    <section className="cards">
      <ul className="cards__list">
        {cards.slice(0, amountOfCards).map((film) => (
          <li className="cards__element" key={film.id}>
            <MoviesCard
              key={film.id}
              film={film}
              isSaved={isSaved}
            />
          </li>
        ))}
      </ul>

      <button className="cards__more" type="button" onClick={addCards} hidden={isAllCards}>Ещё</button>

    </section>
  );
};

export default MoviesCardList;