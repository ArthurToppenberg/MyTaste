import React from 'react';

interface ButtonProps {
    text: string;
}

const HelloBox: React.FC<ButtonProps> = ({ text }) => {
    return (
        <p>{text}</p>
    );
};

export default HelloBox;