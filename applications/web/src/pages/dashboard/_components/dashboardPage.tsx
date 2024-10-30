import React from 'react';

interface DashboardPageProps {
    leftComponent: React.ReactNode;
    rightComponent: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ leftComponent, rightComponent }) => {
    return (
        <div style={{ display: 'flex', backgroundColor: 'var(--color-gray)'}}>
            <div style={{ flex: 0}}>
                {leftComponent}
            </div>
            <div style={{ flex: 1 }}>
                {rightComponent}
            </div>
        </div>
    );
};

export default DashboardPage;