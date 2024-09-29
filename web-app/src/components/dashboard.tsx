import React, { ReactElement, useEffect } from 'react';
import style from '@/styles/dashboard.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToolBar from '@/components/dashboard_toolbar';

interface DashboardSelectionProps {
    name: string;
    displayComponent: ReactElement;
}

interface DashboardProps {
    selectionDropdownName: string;
    defaultDisplayComponent?: number;
    selectionProps: DashboardSelectionProps[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectionDropdownName, selectionProps, defaultDisplayComponent = 0 }) => {
    const [selectedComponent, setSelectedComponent] = React.useState<ReactElement>(selectionProps[defaultDisplayComponent].displayComponent);

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
                        defaultItem: defaultDisplayComponent,
                        itemsProps: selectionProps.map((selectionProp) => {
                            return {
                                name: selectionProp.name,
                                onClick: () => {
                                    setSelectedComponent(selectionProp.displayComponent); 
                                }
                            };
                        }),
                    }
                }
            />
            {selectedComponent ? selectedComponent : null}
        </div>
    );
};

export default Dashboard;