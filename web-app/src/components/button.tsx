import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;