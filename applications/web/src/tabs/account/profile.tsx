import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabStyles from '@/styles/tab.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={`${tabStyles.background_overlay}`}>
                <div className={`${tabStyles.content_defualt}`}>
                    <h1>Profile page still underdevelopment</h1>
                </div>
            </div>
        </>
    );
};

export default Home;