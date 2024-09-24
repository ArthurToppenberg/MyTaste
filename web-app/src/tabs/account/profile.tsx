import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/home.module.css';
import tabStyles from '@/styles/tab.module.css';
import fonts from '@/styles/fonts.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={`${tabStyles.background_overlay}`}>
                <div className={`${tabStyles.content_defualt}`}>
                    <h1>PROFILE</h1>
                </div>
            </div>
        </>
    );
};

export default Home;