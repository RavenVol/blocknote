import React from 'react';

import '../../../styles/css/homePage.css';

const HomePage = ({handleModalOpen}) => {
  return (
    <div className="home">
      <p className="home__greet home__greet--1">Wellcome</p>
      <p className="home__greet home__greet--2">to</p>
      <h1 className="home__siteName">BlockNote</h1>
      <button 
        className="home__btn home__btn--login"
        onClick={() => handleModalOpen('login')}
      >
        LogIn
      </button>
      <button 
        className="home__btn home__btn--signin"
        onClick={() => handleModalOpen('signin')}
      >
        SignIn
      </button>
    </div>
  );
}

export default HomePage;

