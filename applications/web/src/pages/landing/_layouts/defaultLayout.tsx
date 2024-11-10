import NavBar from '../_components/navbar';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <NavBar />
            {children}
        </div>
    );
};

export default DefaultLayout;