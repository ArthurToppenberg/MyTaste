import React from 'react';
import Style from '@/styles/home.module.css';
import DefaultLayout from '@/pages/landing/layouts/defaultLayout';
import Fonts from '@/styles/fonts.module.css';

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className={`${Style.background_image}`}>
        <div className={`${Style.hero_container}`}>
          <h1 className={`${Fonts.logo} ${Style.hero_title}`}>My Taste</h1>
          <p className={`${Fonts.text} ${Style.hero_description}`}>
            Discover your <strong> taste </strong> today,
            sign up to get started
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default HomePage;