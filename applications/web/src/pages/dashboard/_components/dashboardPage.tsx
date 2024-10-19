import React from 'react';
import fonts from '@/styles/fonts.module.css';

interface DashboardPageProps {
    leftComponent: React.ReactNode;
    rightComponent: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ leftComponent, rightComponent }) => {
    return (
        <div style={{ display: 'flex'}}>
            <div style={{ flex: 0, fontFamily: `${fonts.text}` }}>
                {leftComponent}
            </div>
            <div style={{ flex: 1 }}>
                {rightComponent}
            </div>
        </div>
    );
};

export default DashboardPage;