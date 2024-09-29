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
                            displayComponent: <div>Users</div>
                        },
                        {
                            name: 'Restaurants',
                            displayComponent: <div>Resturants</div>
                        }
                    ]} 
                />
            </div>
        </>
    );
};

export default Home;