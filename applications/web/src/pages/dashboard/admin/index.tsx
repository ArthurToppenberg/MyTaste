import React from 'react';
import Sidebar from '../_components/sidebar';
import SidebarButton from '../_components/sidebarButton';
import { SidebarRouterProvider, SidebarRouter } from '../_contexts/sidebarRouterContext'; // Correct import
import Features from './_tabs/features';
import DashboardPage from '../_components/dashboardPage';

const Admin: React.FC = () => {
    return (
        <SidebarRouterProvider
            tabs={[
                { key: 'overview', component: <div>Overview</div> },
                { key: 'features', component: <Features /> },
            ]}
            initialTab='features'
        >
            <DashboardPage
                leftComponent={
                    <Sidebar title='Admin'>
                        <SidebarButton name='Overview' tab='overview' />
                        <SidebarButton name='Features' tab='features' />
                    </Sidebar>
                }
                rightComponent={
                    <SidebarRouter />
                }
            />
        </SidebarRouterProvider>
    );
};

export default Admin;
