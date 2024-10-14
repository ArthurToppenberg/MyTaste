import React, { useEffect } from 'react';
import { useAuthContext } from '@packages/authProvider';

const Dashboard: React.FC = () => {
    const { localDeleteToken } = useAuthContext();

    useEffect(() => {
        localDeleteToken();
    }, []);

    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>This is a protected page. Only authorized users can see this.</p>
            <p>You authentication token has been deleted</p>
        </div>
    );
};

export default Dashboard;