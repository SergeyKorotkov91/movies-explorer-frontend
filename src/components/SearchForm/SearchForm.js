import './SearchForm.css';
import { useState } from 'react';
import lens from '../../images/icon.svg'

const SearchForm = () => {

    const [isOn, setIsOn] = useState(false);

    function handleOnChange() {
        setIsOn(!isOn);
    }

    return (
        <section>
            <form className="search">
                <div className="search__container">
                    <img className="search__lens" src={lens} alt="лупа" />
                    <input className="search__input" placeholder="Фильм" type="text" defaultValue='' required />
                    <button type="submit" className="search__button" >Найти</button>
                </div>
                <div className="search__short-films">
                    <label className="search__label">
                        <input className="search__checkbox" type="checkbox" onChange={handleOnChange} value={isOn} checked={isOn} />
                        <span className="search__ellipse" />
                    </label>
                    <p className="search__type">Короткометражки</p>
                </div>
            </form>
        </section>

    );
}

export default SearchForm;