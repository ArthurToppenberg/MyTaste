import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import tabStyles from '@/styles/tab.module.css';
import Dashboard from '@/components/dashboard';

const Home: React.FC = () => {
    return (
        <>
            <div className={`${tabStyles.content_custom}`}>
                <Dashboard 
                    selectionDropdownName={'View'} 
                    selectionProps={[
                        {
                            name: 'Users',
                            apiEndpoint: '/api/accounts'
                        },
                        {
                            name: 'Restaurants',
                            apiEndpoint: '/api/restaurants'
                        }
                    ]} 
                />
            </div>
        </>
    );
};

export default Home;