import "./SearchForm.css";
import lens from "../../images/icon.svg";
import { useCallback } from "react";

const SearchForm = ({ onSearch }) => {
  const search = useCallback((form) => {
    onSearch({
        short: !form.elements.short.checked,
        text: form.elements.text.value
    });
  }, [onSearch]);

  const onShortToggle = useCallback((e) => {
    search(e.target.form);
  }, [search]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    search(e.target);
  }, [search]);

  return (
    <section>
      <form className="search" onSubmit={onSubmit}>
        <div className="search__container">
          <img className="search__lens" src={lens} alt="лупа" />
          <input
            className="search__input"
            placeholder="Фильм"
            type="text"
            defaultValue=""
            name="text"
          />
          <button type="submit" className="search__button">
            Найти
          </button>
        </div>
        <div className="search__short-films">
          <label className="search__label">
            <input className="search__checkbox" type="checkbox" name="short" defaultChecked={true} onInput={onShortToggle}/>
            <span className="search__ellipse" />
          </label>
          <p className="search__type">Короткометражки</p>
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
