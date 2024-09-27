import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/home.module.css';
import tabStyles from '@/styles/tab.module.css';
import fonts from '@/styles/fonts.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={`${styles.background_image}`}>
                <div className={`${tabStyles.background_overlay}`}>
                    <div className={`${tabStyles.content_defualt}`}>
                        <div className={`${tabStyles.container}`}>
                            <div className={`${tabStyles.title_container}`}>
                                <h1 className={`${tabStyles.title} ${fonts.text}`}>My Taste</h1>
                                <p className={`${tabStyles.subtitle} ${fonts.text}`}>
                                    Discover your
                                    {' '}<span className={`${fonts.text_pop}`}>taste</span>{' '}
                                    today,<br /> sign up to get started
                                </p>
                            </div>
                        </div>
                        <div className={`${tabStyles.container}`}>
                            <Image 
                                src="/images/iphone.png" 
                                alt="iPhone displaying My Taste app" 
                                className={`${styles.img_iphone} ${tabStyles.container_left}`} 
                                width={500} 
                                height={500} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
