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
                { key: 'features', component: <Features /> },
            ]}
            initialTab='features'
        >
            <DashboardPage
                leftComponent={
                    <Sidebar title='Admin'>
                        <SidebarButton name='Overview' tab='overview' />
                        <SidebarButton name='Features' tab='features' />
                        <SidebarButton name='Prompts' tab='prompts' />
                        <SidebarButton name='Wheights' tab='wheights' />
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
