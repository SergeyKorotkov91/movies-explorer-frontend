import './Profile.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Profile = () => {

    const [isAble, setIsAble] = useState(true);
    const [isHidden, setIsHidden] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
    }

    function handleEditClick(e){
        e.preventDefault();
        setIsAble(!isAble);
        setIsHidden(!isHidden);
    }

    function handleSaveClick(e){
        e.preventDefault();
        setIsAble(!isAble);
        setIsHidden(!isHidden);
    }

    return (
        <main className="profile">
            <section className="profile__container">

                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <fieldset className="profile__info">
                        <div className="profile__container-form">
                            <label className="profile__label">Имя</label>
                            <input
                                className="profile__input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Имя"
                                minLength="2"
                                maxLength="30"
                                defaultValue="Виталий"
                                required
                                disabled={isAble}
                            ></input>
                        </div>
                        <div className="profile__container-form">
                            <label className="profile__label">E-mail</label>
                            <input
                                className="profile__input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                defaultValue="pochta@yandex.ru"
                                disabled={isAble}
                            ></input>
                        </div>

                    </fieldset>
                    <div className="profile__buttons" >
                        <button className="profile__edit-button" type='button' onClick={handleEditClick} hidden={isHidden}>Редактировать</button>
                        <NavLink className="profile__signout-button" hidden={isHidden} to='/'>Выйти из аккаунта</NavLink>
                    </div>
                    <button className="profile__save-button" type='submit' onClick={handleSaveClick} hidden={!isHidden}>Сохранить</button>
                </form>
            </section>


        </main>

    );
}

export default Profile;