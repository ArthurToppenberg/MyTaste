import React from 'react';
import { Navbar, NavbarBrand } from '@nextui-org/react';

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