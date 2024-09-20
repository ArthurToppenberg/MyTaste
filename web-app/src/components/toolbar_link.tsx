import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ToolbarLinkProps {
    children: React.ReactNode;
    highlight: boolean;
    onClick?: () => void;
}

const ToolbarLink: React.FC<ToolbarLinkProps> = ({ children, highlight, onClick }) => {
    return (
        <div 
            className={`btn ${highlight ? 'btn-primary' : 'btn-secondary'}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ToolbarLink;