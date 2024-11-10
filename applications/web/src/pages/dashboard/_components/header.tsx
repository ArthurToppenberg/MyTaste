import React from 'react';
import Style from '@/styles/header.module.css';
import Fonts from '@/styles/fonts.module.css';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <div className={`${Style.container}`}>
            <h1 className={`${Style.item_center} ${Fonts.text_ui}`}>{title}</h1>
        </div>
    );
};

export default Header;