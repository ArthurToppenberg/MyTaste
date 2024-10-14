import NavBar from '@/components/navbar';
import { ReactNode } from 'react';

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    );
};

export default DefaultLayout;