import React from 'react';
import styles from '@/styles/dashboard_toolbar.module.css';
import DashboardToolbarDropdown, {DashboardDropdownProps} from './dashboard_toolbar_dropdown';

interface DashboardToolBarProps {
    onReload: () => void;
    dashboardSelectionDropdownProps: DashboardDropdownProps;
}

const DashboardToolBar: React.FC<DashboardToolBarProps> = ({dashboardSelectionDropdownProps}) => {
    return (
        <div className={styles.toolbar_container}>
            <div className={styles.toolbar_container_left}>
                <DashboardToolbarDropdown {...dashboardSelectionDropdownProps} />
            </div>
            <div className={styles.toolbar_container_right}>
                <div className={styles.toolbar_button_container}>
                    Refresh
                </div>
            </div>
        </div>
    );
};

export default DashboardToolBar;