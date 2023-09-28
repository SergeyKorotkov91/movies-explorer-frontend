import './Profile.css';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormValidation } from '../../utils/useFormValidation';
import { PROFILE_MODE } from '../../utils/constants';
import { ServerErrorContext } from '../../contexts/ServerError';

const Profile = ({ onSignout, onUpdateProfile, startEditingProfile, mode, successMessage }) => {
  const serverError = useContext(ServerErrorContext);
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useFormValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(values);
  };

  const isEditingMode = mode !== PROFILE_MODE.viewing;

  return (
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__info">
            <div className="profile__container-form">
              <label className="profile__label">Имя</label>
              <input
                className={`profile__input ${errors.name && 'profile__input_error'}`}
                id="name"
                name="name"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                value={values.name || ''}
                onChange={handleChange}
                required
                disabled={!isEditingMode}
              />
              <span className="profile__input-error-message">{errors.name || ''}</span>
            </div>
            <div className="profile__container-form">
              <label className="profile__label">E-mail</label>
              <input
                className={`profile__input ${errors.email && 'profile__input_error'}`}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={values.email || ''}
                onChange={handleChange}
                disabled={!isEditingMode}
              />
              <span className="profile__input-error-message">{errors.email || ''}</span>
            </div>
          </fieldset>

          <div className="profile__buttons">

            {serverError && <p className="profile__message_error">{serverError}</p>}
            {successMessage && <p className="profile__message">{successMessage}</p>}

            <button className="profile__edit-button" type="button" onClick={startEditingProfile} hidden={isEditingMode}>
              Редактировать
            </button>

            <button className="profile__signout-button" hidden={isEditingMode} type="button" to="/" onClick={onSignout}>
              Выйти из аккаунта
            </button>

            <button
            className="profile__save-button"
            type="submit"
            hidden={mode === PROFILE_MODE.viewing}
            disabled={Boolean(
              !isValid ||
                mode === PROFILE_MODE.saving ||
                (currentUser.name === values.name && currentUser.email === values.email),
            )}
            >
              Сохранить
            </button>

          </div>
        </form>
      </section>
    </main>
  );
};

export default Profile;
