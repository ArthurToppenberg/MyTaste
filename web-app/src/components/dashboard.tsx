import React from 'react';
import style from '@/styles/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolBar from '@/components/dashboard_toolbar';

interface DashboardProps {

}

const Dashboard: React.FC<DashboardProps> = ({ }) => {
    return (
        <div className={style.container}>
            <ToolBar
                onReload={
                    function (): void {
                        throw new Error('Function not implemented.');
                    }
                }
                dashboardSelectionDropdownProps={
                    {
                        name: 'View',
                        itemsProps: [
                            {
                                name: 'Users',
                                onClick: function (): void {
                                   
                                }
                            },
                            {
                                name: 'Restorants',
                                onClick: function (): void {
                                    
                                }
                            }
                        ],
                        defaultItem: 0
                    }
                }
            />
        </div>
    );
};

export default Dashboard;