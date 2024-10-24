import React from 'react';
import Style from '@/styles/home.module.css';
import DefaultLayout from '@/pages/landing/_layouts/defaultLayout';
import Fonts from '@/styles/fonts.module.css';
import NextImage from 'next/image';
import { Image } from "@nextui-org/react";

const HomePage: React.FC = () => {
  return (
    <DefaultLayout>
      <div className={`${Style.background_image_main}`}>
        <div className={`${Style.hero_container}`}>
          <h1 className={`${Fonts.logo} ${Style.hero_title}`}>My Taste</h1>
          <p className={`${Fonts.text} ${Style.hero_description}`}>
            Discover your <strong> taste </strong> today,
            sign up to get started
          </p>
        </div>
      </div>
      <div className={`${Style.container_split}`}>
        <div className={`${Style.container_split_left}`}>
          <div>
            <p className={`${Style.topic_title} ${Fonts.text}`}>
              Mobile App
            </p>
            <p className={`${Style.topic_description} ${Fonts.text}`}>
              Coming to the app store
            </p>

          </div>
          <Image
             as={NextImage}
            src="/images/iphone.png"
            alt="phone mockup"
            width={350}
            height={750}
            isBlurred
          />
        </div>
        <div className={`${Style.container_split_right}`}>
          <div className={`${Style.container_image_collage}`}>
            <Image
              as={NextImage}
              src="/images/menu_card.jpg"
              alt="menu card with mytaste qr code"
              width={500}
              height={500}
              isBlurred
              className="m-5"
            />
          </div>
        </div>
      </div>

    </DefaultLayout>
  );
};

export default HomePage;