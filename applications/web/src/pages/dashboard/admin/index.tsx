import React from 'react';
import Sidebar from '../_components/sidebar';
import SidebarButton from '../_components/sidebarButton';
import { SidebarRouterProvider, SidebarRouter } from '../_contexts/sidebarRouterContext'; // Correct import
import Features from './_tabs/features';
import MobileAccounts from './_tabs/mobileAccounts';
import DashboardPage from '../_components/dashboardPage';

const Admin: React.FC = () => {
    return (
        <SidebarRouterProvider
            tabs={[
                { key: 'features', component: <Features /> },
                { key: 'mobileAccounts', component: <MobileAccounts /> },
            ]}
            initialTab='features'
        >
            <DashboardPage
                leftComponent={
                    <Sidebar title='Admin'>
                        <SidebarButton name='Overview' tab='overview' active={false}/>
                        <SidebarButton name='Mobile Accounts' tab='mobileAccounts' />
                        <SidebarButton name='Features' tab='features' />
                        <SidebarButton name='Prompts' tab='prompts' active={false}/>
                        <SidebarButton name='Wheights' tab='wheights' active={false}/>
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
