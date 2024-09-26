import React from 'react';
import style from '@/styles/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolBar from '@/components/dashboard_toolbar';
import DashboardTable from '@/components/dashboard_table';

interface DashboardSelectionProps {
    name: string;
    apiEndpoint: string;
}

interface DashboardProps {
    selectionDropdownName: string;
    selectionProps: DashboardSelectionProps[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectionDropdownName, selectionProps }) => {
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
                        name: selectionDropdownName,
                        /*
                            name: string
                            OnClick: () => void

                            do this for each item in selectionProps
                        */
                        itemsProps: selectionProps.map((selectionProp) => {
                            return {
                                name: selectionProp.name,
                                onClick: () => {
                                    console.log(selectionProp.apiEndpoint);
                                }
                            };
                        }),
                    }
                }
            />
            <DashboardTable
                collumnHeaders={['Id', 'Name', 'Email', 'Role']}
                collumns={[
                    { strings: ['John Doe', 'John.Doe@gmail.com', 'Admin'] },
                    { strings: ['Jane Smith', 'Jane.Smith@gmail.com', 'User'] },
                    { strings: ['Alice Johnson', 'Alice.Johnson@gmail.com', 'User'] },
                    { strings: ['Bob Brown', 'Bob.Brown@gmail.com', 'User'] },
                    { strings: ['Charlie Davis', 'Charlie.Davis@gmail.com', 'User'] },
                    { strings: ['David Evans', 'David.Evans@gmail.com', 'User'] },
                    { strings: ['Eve Foster', 'Eve.Foster@gmail.com', 'User'] },
                    { strings: ['Frank Green', 'Frank.Green@gmail.com', 'User'] },
                    { strings: ['Grace Harris', 'Grace.Harris@gmail.com', 'User'] },
                    { strings: ['Hank Irving', 'Hank.Irving@gmail.com', 'User'] },
                    { strings: ['Ivy Johnson', 'Ivy.Johnson@gmail.com', 'User'] },
                    { strings: ['Jack King', 'Jack.King@gmail.com', 'User'] },
                    { strings: ['Karen Lee', 'Karen.Lee@gmail.com', 'User'] },
                    { strings: ['Leo Martin', 'Leo.Martin@gmail.com', 'User'] },
                    { strings: ['Mona Nelson', 'Mona.Nelson@gmail.com', 'User'] },
                    { strings: ['Nina Owens', 'Nina.Owens@gmail.com', 'User'] },
                    { strings: ['Oscar Perez', 'Oscar.Perez@gmail.com', 'User'] },
                    { strings: ['Paul Quinn', 'Paul.Quinn@gmail.com', 'User'] },
                    { strings: ['Quincy Roberts', 'Quincy.Roberts@gmail.com', 'User'] },
                    { strings: ['Rachel Scott', 'Rachel.Scott@gmail.com', 'User'] },
                    { strings: ['John Doe', 'John.Doe@gmail.com', 'Admin'] },
                    { strings: ['Jane Smith', 'Jane.Smith@gmail.com', 'User'] },
                    { strings: ['Alice Johnson', 'Alice.Johnson@gmail.com', 'User'] },
                    { strings: ['Bob Brown', 'Bob.Brown@gmail.com', 'User'] },
                    { strings: ['Charlie Davis', 'Charlie.Davis@gmail.com', 'User'] },
                    { strings: ['David Evans', 'David.Evans@gmail.com', 'User'] },
                    { strings: ['Eve Foster', 'Eve.Foster@gmail.com', 'User'] },
                    { strings: ['Frank Green', 'Frank.Green@gmail.com', 'User'] },
                    { strings: ['Grace Harris', 'Grace.Harris@gmail.com', 'User'] },
                    { strings: ['Hank Irving', 'Hank.Irving@gmail.com', 'User'] },
                    { strings: ['Ivy Johnson', 'Ivy.Johnson@gmail.com', 'User'] },
                    { strings: ['Jack King', 'Jack.King@gmail.com', 'User'] },
                    { strings: ['Karen Lee', 'Karen.Lee@gmail.com', 'User'] },
                    { strings: ['Leo Martin', 'Leo.Martin@gmail.com', 'User'] },
                    { strings: ['Mona Nelson', 'Mona.Nelson@gmail.com', 'User'] },
                    { strings: ['Nina Owens', 'Nina.Owens@gmail.com', 'User'] },
                    { strings: ['Oscar Perez', 'Oscar.Perez@gmail.com', 'User'] },
                    { strings: ['Paul Quinn', 'Paul.Quinn@gmail.com', 'User'] },
                    { strings: ['Quincy Roberts', 'Quincy.Roberts@gmail.com', 'User'] },
                    { strings: ['Rachel Scott', 'Rachel.Scott@gmail.com', 'User'] },
                    { strings: ['John Doe', 'John.Doe@gmail.com', 'Admin'] },
                    { strings: ['Jane Smith', 'Jane.Smith@gmail.com', 'User'] },
                    { strings: ['Alice Johnson', 'Alice.Johnson@gmail.com', 'User'] },
                    { strings: ['Bob Brown', 'Bob.Brown@gmail.com', 'User'] },
                    { strings: ['Charlie Davis', 'Charlie.Davis@gmail.com', 'User'] },
                    { strings: ['David Evans', 'David.Evans@gmail.com', 'User'] },
                    { strings: ['Eve Foster', 'Eve.Foster@gmail.com', 'User'] },
                    { strings: ['Frank Green', 'Frank.Green@gmail.com', 'User'] },
                    { strings: ['Grace Harris', 'Grace.Harris@gmail.com', 'User'] },
                    { strings: ['Hank Irving', 'Hank.Irving@gmail.com', 'User'] },
                    { strings: ['Ivy Johnson', 'Ivy.Johnson@gmail.com', 'User'] },
                    { strings: ['Jack King', 'Jack.King@gmail.com', 'User'] },
                    { strings: ['Karen Lee', 'Karen.Lee@gmail.com', 'User'] },
                    { strings: ['Leo Martin', 'Leo.Martin@gmail.com', 'User'] },
                    { strings: ['Mona Nelson', 'Mona.Nelson@gmail.com', 'User'] },
                    { strings: ['Nina Owens', 'Nina.Owens@gmail.com', 'User'] },
                    { strings: ['Oscar Perez', 'Oscar.Perez@gmail.com', 'User'] },
                    { strings: ['Paul Quinn', 'Paul.Quinn@gmail.com', 'User'] },
                    { strings: ['Quincy Roberts', 'Quincy.Roberts@gmail.com', 'User'] },
                    { strings: ['Rachel Scott', 'Rachel.Scott@gmail.com', 'User'] },
                    { strings: ['John Doe', 'John.Doe@gmail.com', 'Admin'] },
                    { strings: ['Jane Smith', 'Jane.Smith@gmail.com', 'User'] },
                    { strings: ['Alice Johnson', 'Alice.Johnson@gmail.com', 'User'] },
                    { strings: ['Bob Brown', 'Bob.Brown@gmail.com', 'User'] },
                    { strings: ['Charlie Davis', 'Charlie.Davis@gmail.com', 'User'] },
                    { strings: ['David Evans', 'David.Evans@gmail.com', 'User'] },
                    { strings: ['Eve Foster', 'Eve.Foster@gmail.com', 'User'] },
                    { strings: ['Frank Green', 'Frank.Green@gmail.com', 'User'] },
                    { strings: ['Grace Harris', 'Grace.Harris@gmail.com', 'User'] },
                    { strings: ['Hank Irving', 'Hank.Irving@gmail.com', 'User'] },
                    { strings: ['Ivy Johnson', 'Ivy.Johnson@gmail.com', 'User'] },
                    { strings: ['Jack King', 'Jack.King@gmail.com', 'User'] },
                    { strings: ['Karen Lee', 'Karen.Lee@gmail.com', 'User'] },
                    { strings: ['Leo Martin', 'Leo.Martin@gmail.com', 'User'] },
                    { strings: ['Mona Nelson', 'Mona.Nelson@gmail.com', 'User'] },
                    { strings: ['Nina Owens', 'Nina.Owens@gmail.com', 'User'] },
                    { strings: ['Oscar Perez', 'Oscar.Perez@gmail.com', 'User'] },
                    { strings: ['Paul Quinn', 'Paul.Quinn@gmail.com', 'User'] },
                    { strings: ['Quincy Roberts', 'Quincy.Roberts@gmail.com', 'User'] },
                    { strings: ['Rachel Scott', 'Rachel.Scott@gmail.com', 'User'] },
                ]}
            />
        </div>
    );
};

export default Dashboard;