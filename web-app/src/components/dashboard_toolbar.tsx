import React from 'react';
import styles from '@/styles/dashboard_toolbar.module.css';
import DashboardToolbarDropdown, {DashboardDropdownProps} from './dashboard_toolbar_dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface DashboardToolBarProps {
    onReload: () => void;
    isRefreshing?: boolean;
    dashboardSelectionDropdownProps: DashboardDropdownProps;
}

const DashboardToolBar: React.FC<DashboardToolBarProps> = ({dashboardSelectionDropdownProps, onReload, isRefreshing}) => {
    return (
        <div className={styles.toolbar_container}>
            <div className={styles.toolbar_container_left}>
                <DashboardToolbarDropdown {...dashboardSelectionDropdownProps} />
            </div>
            <div className={styles.toolbar_container_right}>
                <div className={styles.toolbar_button_container} onClick={onReload}>
                    Refresh
                    {isRefreshing && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                </div>
            </div>
        </div>
    );
};

export default DashboardToolBar;