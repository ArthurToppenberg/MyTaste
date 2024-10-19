import React from 'react';
import { Navbar, NavbarBrand } from '@nextui-org/react';
import fonts from '@/styles/fonts.module.css';

export interface TabHeaderProps {
    title: string;
}

const TabHeader: React.FC<TabHeaderProps> = ({ title }) => {
    return (
        <Navbar className='dark-background'>
            <NavbarBrand >
                <p>{title}</p>
            </NavbarBrand>
        </Navbar>
    );
};

export default TabHeader;