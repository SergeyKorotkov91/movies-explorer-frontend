import './Form.css';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useEffect, useState } from 'react';
import { useFormValidation } from '../../utils/useFormValidation';
import { ServerErrorContext } from '../../contexts/ServerError';

function Form({ name, title, inputs, buttonText, onSubmit, disabled, navLink, navText, text }) {
  const error = useContext(ServerErrorContext);
  const { values, handleChange, defaultChange, errors, isValid } = useFormValidation();

  useEffect(() => {
    defaultChange(inputs);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ ...values });
  }

  return (
    <section>
      <form className="form" name={name} noValidate onSubmit={handleSubmit}>
        <div className="form__box">
          <NavLink className="form__logo-link" to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </NavLink>

          <h1 className="form__title">{title}</h1>
          <div className="form__container">
            {inputs.map((item) => {
              return (
                <div className="form__element" key={item.key}>
                  <label className="form__label">{item.title}</label>
                  <input
                    className="form__input"
                    type={item.type}
                    name={item.name}
                    required={item.required}
                    minLength={item.minLength}
                    maxLength={item.maxLength}
                    placeholder={item.placeholder}
                    value={values[item.name] || ''}
                    onInput={handleChange}
                    disabled={disabled}
                  />
                  <span className="form__error">{errors[item.name]}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form__footer">
          <p className="form__error-message">{error}</p>
          <button className="form__button-submit" type="submit" disabled={!isValid || disabled}>
            {buttonText}
          </button>
          <nav className="form__navigation">
            <p className="form__message">{text}</p>
            <NavLink className="form__navlink" to={navLink}>
              {navText}
            </NavLink>
          </nav>
        </div>
      </form>
    </section>
  );
}

export default Form;
