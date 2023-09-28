import './SearchForm.css';
import lens from '../../images/icon.svg';
import { useCallback, useEffect, useRef, useState } from 'react';

const SearchForm = ({ onSearch, searchQuery, mode }) => {
  const [text, setText] = useState(searchQuery.text);
  const [short, setShort] = useState(searchQuery.short);
  useEffect(() => {
    setText(searchQuery.text);
    setShort(searchQuery.short);
  }, [searchQuery, mode]);

  const shortRef = useRef();
  shortRef.current = short;
  const textRef = useRef();
  textRef.current = text;

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSearch({ short: shortRef.current, text: textRef.current });
    },
    [onSearch],
  );

  useEffect(() => {
    onSearch({ short, text: textRef.current });
  }, [onSearch, short]);

  return (
    <section>
      <form className="search" onSubmit={onSubmit}>
        <div className="search__container">
          <img className="search__lens" src={lens} alt="лупа" />
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            value={text}
            onInput={useCallback((e) => setText(e.target.value), [])}
          />
          <button type="submit" className="search__button">
            Найти
          </button>
        </div>
        <div className="search__short-films">
          <label className="search__label">
            <input
              className="search__checkbox"
              type="checkbox"
              checked={!short}
              onChange={useCallback((e) => setShort(!e.target.checked), [])}
            />
            <span className="search__ellipse" />
          </label>
          <p className="search__type">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
