import './Promo.css'
import React from 'react';
import landing from '../../images/landing-logo.svg'

const Promo = () => {

    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo__logo" alt='Практикум' src={landing} />
        </section>
    );
}

export default Promo;