import './Profile.css';
import { useCallback, useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';

const Profile = ({ onSignout, onUpdate }) => {
    const currentUser = useContext(CurrentUserContext);
    const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

    const [isEditingMode, setIsEditingMode] = useState(false);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();

        onUpdate({
            name: e.target.elements.name.value,
            email: e.target.elements.email.value,
        });
    }, [onUpdate]);

    return (
        <main className="profile">
            <section className="profile__container">

                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile__form" onSubmit={onSubmit}>
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
                                defaultValue={currentUser.name}
                                required
                                disabled={!isEditingMode}
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
                                defaultValue={currentUser.email}
                                disabled={!isEditingMode}
                            ></input>
                        </div>

                    </fieldset>
                    <div className="profile__buttons">
                        <button className="profile__edit-button" type='button' onClick={() => setIsEditingMode(true)} hidden={isEditingMode}>Редактировать</button>
                        <button className="profile__signout-button" hidden={isEditingMode} type="button" to='/' onClick={onSignout}>Выйти из аккаунта</button>
                    </div>
                    <button className="profile__save-button" type='submit' hidden={!isEditingMode}>Сохранить</button>
                </form>
            </section>


        </main>

    );
}

export default Profile;